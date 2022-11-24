using CommboxAgents.Models;
using CommboxAgents.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CommboxAgents.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentsController : Controller
    {
        private readonly IConfiguration m_config;

        public AgentsController(IConfiguration config)
        {
            m_config = config;
        }
        [HttpGet]
        public List<Agent> Get()
        {
            try
            {
                List<Agent> data =  DataProvider.GetAllAgents(m_config);
                return data;
            }
            catch (Exception ex) {
                ///write to log
            }
            return new List<Agent>();
        }
        [HttpPost]
        [Route("add")]
        public int Add(CreateFormData createFormData)
        {
            int returnValue = 3;
            try
            {
                returnValue = DataProvider.AddNewAgent(m_config, createFormData);
            }
            catch (Exception ex)
            {
                ///write to log
            }
            return returnValue;
        }
    }
}
