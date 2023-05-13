// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DbContext context) : base(context)
        { }

        public async Task<IEnumerable<Product>> GetAllProductsData(int page, int pageSize)
        {
            IQueryable<Product> usersQuery = _appContext.Products;

            if (page > 0)
                usersQuery = usersQuery.Skip(page * pageSize);

            if (pageSize != -1)
                usersQuery = usersQuery.Take(pageSize);

            //var products = await _appContext.Products.OrderBy(p => p.Id).Skip((page -1) * pageSize).Take(pageSize).ToListAsync();

            var products = await usersQuery.OrderBy(p => p.Id).ToListAsync();

            return products;
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
