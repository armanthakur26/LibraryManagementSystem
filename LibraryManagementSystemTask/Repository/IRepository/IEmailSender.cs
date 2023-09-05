namespace LibraryManagementSystemTask.Repository.IRepository
{
    public interface IEmailSender
    {
        Task Execute(string email, string Subject, string message);
        Task SendEmailAsync(string email, string subject, string Message);
    }
}
