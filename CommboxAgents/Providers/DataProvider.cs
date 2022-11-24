using CommboxAgents.Models;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CommboxAgents.Providers
{
    public static class DataProvider
    {
        /// <summary>
        /// MySql StoredProcedure : GetAllAgentsAndSkills
        /// 
        /// View GetAllAgentsAndSkills on : ../MySql/StoredProcedure/GetAllAgentsAndSkills
        /// </summary>
        /// <param name="configuration"></param>
        /// <returns>List<Agent> --> all page data</returns>
        public static List<Agent> GetAllAgents(IConfiguration configuration) {
            string connectionString = configuration.GetConnectionString("DefaultConnection");

            List<Agent> agents = new List<Agent>();
            List<AgentSkill> agentSkills = new List<AgentSkill>();
            List<Location> locations = new List<Location>();

            DataSet dataset = new DataSet();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {

                conn.Open();

                MySqlDataAdapter adapter = new MySqlDataAdapter();
                adapter.SelectCommand = new MySqlCommand("commbox.GetAllAgentsAndSkills", conn);
                adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapter.Fill(dataset);

                if (dataset.Tables.Count == 3) {

                    DataTable skillsTable = dataset.Tables[0];

                    foreach (DataRow dr in skillsTable.Rows)
                    {
                        agentSkills.Add(
                            new AgentSkill()
                            {
                                SkillID = Convert.ToInt32(dr["SkillID"]),
                                AgentID = Convert.ToInt32(dr["AgentID"]),
                                Name = dr["Name"].ToString()
                            }
                        );
                    }

                    DataTable agentsTable = dataset.Tables[1];

                    foreach (DataRow dr in agentsTable.Rows)
                    {
                        agents.Add(
                            new Agent()
                            {
                                AgentID = Convert.ToInt32(dr["AgentID"]),
                                Name = dr["Name"].ToString()
                            }
                        );
                    }

                    DataTable locationsTable = dataset.Tables[2];

                    foreach (DataRow dr in locationsTable.Rows)
                    {
                        locations.Add(
                            new Location()
                            {
                                AgentID = Convert.ToInt32(dr["AgentID"]),
                                LocationID = Convert.ToInt32(dr["LocationID"]),
                                Lat = Convert.ToDouble(dr["Lat"]),
                                Lng = Convert.ToDouble(dr["Lng"])
                            }
                        );
                    }


                }

            }

            foreach (Agent agent in agents) {
                agent.Skills = agentSkills.FindAll(skill => skill.AgentID == agent.AgentID);
                agent.Location = locations.Find(location => location.AgentID == agent.AgentID);
            }
            return agents;
        }
        /// <summary>
        /// MySql StoredProcedure : CreateNewAgent2
        /// 
        /// View CreateNewAgent2 on : ../MySql/StoredProcedure/CreateNewAgent2
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="createFormData">Post data from client</param>
        /// <returns> 0 -> Success  OR 1 -> Error</returns>
        public static int AddNewAgent(IConfiguration configuration, CreateFormData createFormData)
        {

            string connectionString = configuration.GetConnectionString("DefaultConnection");
            int result = 1;//error
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            using (MySqlCommand cmd = new MySqlCommand("commbox.CreateNewAgent2", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("AgentName", createFormData.Name);
                cmd.Parameters.AddWithValue("Skills", GetTrimSkills(createFormData.Skills));
                cmd.Parameters.AddWithValue("LocationLat", createFormData.LocationLat);
                cmd.Parameters.AddWithValue("LocationLng", createFormData.LocationLng);
                var returnValue = new MySqlParameter("ReturnValue", MySqlDbType.Int64) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add(returnValue);

                conn.Open();
                cmd.ExecuteNonQuery();

                result = Int32.Parse(returnValue.Value.ToString());
                conn.Close();
            }
            return result;
        }
        /// <summary>
        /// Handle spaces between each skill 
        /// Example: 
        /// For skills == " aa aa , ss  w   ,ssssss  "
        /// Returns : "aa aa,ss  w,ssssss"
        /// </summary>
        /// <param name="skills"></param>
        /// <returns></returns>
        private static string GetTrimSkills(string skills) {
            string[] forTrimSkills = skills.Split(",");
            string trimSkills = forTrimSkills[0].Trim(' ');
            if (forTrimSkills.Length > 1)
            {
                for (int index = 1; index < forTrimSkills.Length; index++)
                {
                    trimSkills += "," + forTrimSkills[index].Trim(' ');
                }
            }
            return trimSkills;
        }

    }
}
