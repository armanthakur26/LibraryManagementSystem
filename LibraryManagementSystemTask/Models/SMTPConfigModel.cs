namespace LibraryManagementSystemTask.Models
{
    public class SMTPConfigModel
    {
        //not used
        public string PrimaryDomain { get; set; }
        public int PrimaryPort { get; set; }
        public string UsernameEmail { get; set; }
        public string UsernamePassward { get; set; }
        public string FromEmail { get; set; }
        public string ToEmail { get; set; }
        public string CcEmail { get; set; }
        public string Filepath { get; set; }
    }
}
