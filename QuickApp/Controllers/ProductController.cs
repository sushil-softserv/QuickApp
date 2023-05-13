using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.ViewModels;
using DAL.Models;
using DAL.Core.Interfaces;
using QuickApp.Authorization;
using QuickApp.Helpers;
using Microsoft.AspNetCore.JsonPatch;
using DAL.Core;
using DAL;
using AutoMapper;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuickApp.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ProductController> _logger;
        
        public ProductController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<ProductController> logger)
        {
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
            this._logger = logger;
        }

        [HttpGet("{pageNumber:int}/{pageSize:int}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ProductViewModel>))]
        public async Task<IActionResult> Get(int pageNumber, int pageSize)
        {
            var allProducts = await _unitOfWork.Products.GetAllProductsData(pageNumber, pageSize);
            //return Ok(_mapper.Map<IEnumerable<Product>>(allProducts));
            return Ok(allProducts);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] ProductViewModel productViewModel)
        {
            if (ModelState.IsValid)
            {
                if (productViewModel == null)
                {
                    return BadRequest($"{nameof(productViewModel)} cannot be null");
                }

                Product product = new Product();
                product.Name = productViewModel.Name;
                product.Description = productViewModel.Description;
                product.BuyingPrice = productViewModel.BuyingPrice;
                product.SellingPrice = productViewModel.SellingPrice;
                product.UnitsInStock = productViewModel.UnitsInStock;
                product.IsActive = productViewModel.IsActive;
                product.IsDiscontinued = false;
                product.ProductCategoryId = 1;

                _unitOfWork.Products.Add(product);
                _unitOfWork.SaveChanges();
                
            }

           return await Task.Run(() => Ok(productViewModel));
        }
    }
}
