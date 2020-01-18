using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using ApplicationAppraisal.Models;
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace ApplicationAppraisal.Utilities
{
    public class PDFView
    {

        
           

            // Create an instance of the document class which represents the PDF document itself.  
           
        // Create an instance to the PDF file by creating an instance of the PDF   
        // Writer class using the document and the filestrem in the constructor.  
        public static void getPDFView(List<ProductGoals> list,string role, string name, string designation, DateTime date)
        {

            if (role == "True")
            {
                File.Delete("C:\\Users\\Sabarish.a\\Documents\\GitHub\\AppraisalApp\\Phase 2\\AppraisalAngular\\src\\assets\\pdfjs\\Appraiser-View.pdf");


                System.IO.FileStream fs = new FileStream("C:\\Users\\Sabarish.a\\Documents\\GitHub\\AppraisalApp\\Phase 2\\AppraisalAngular\\src\\assets\\pdfjs\\Appraiser-View.pdf", FileMode.Create);

                Document document = new Document(PageSize.A4, 25, 25, 30, 30);

                PdfWriter writer = PdfWriter.GetInstance(document, fs);

                PdfPTable PerformanceTable = new PdfPTable(6);
                PerformanceTable.TotalWidth = 500f;
                float[] widths = new float[] { 160f, 40f, 50f, 100f, 50f, 100f };
                PerformanceTable.SetWidths(widths);

                PerformanceTable.AddCell("Goal");
                PerformanceTable.AddCell("Weightage");

                PerformanceTable.AddCell("Employee Rating");
                PerformanceTable.AddCell("Employee Comments");
                PerformanceTable.AddCell("Manager Rating");

                PerformanceTable.AddCell("Manager Comments");

                PdfPTable CompetencyTable = new PdfPTable(6);
                CompetencyTable.TotalWidth = 500f;
                CompetencyTable.SetWidths(widths);

                CompetencyTable.AddCell("Goal");
                CompetencyTable.AddCell("Weightage");

                CompetencyTable.AddCell("Employee Rating");
                CompetencyTable.AddCell("Employee Comments");
                CompetencyTable.AddCell("Manager Rating");
                CompetencyTable.AddCell("Manager Comments");

                PdfPTable LeaderTable = new PdfPTable(6);
                LeaderTable.TotalWidth = 500f;
                LeaderTable.SetWidths(widths);

                LeaderTable.AddCell("Goal");
                LeaderTable.AddCell("Weightage");

                LeaderTable.AddCell("Employee Rating");
                LeaderTable.AddCell("Employee Comments");
                LeaderTable.AddCell("Manager Rating");
                LeaderTable.AddCell("Manager Comments");

                foreach(ProductGoals goal in list)
                {
                    if(goal.GoalCategory_ID == 1)
                    {
                     
                        PerformanceTable.AddCell(goal.Goal);
                        PerformanceTable.AddCell(goal.Priority.ToString());

                        PerformanceTable.AddCell(goal.EmployeeRating);
                        PerformanceTable.AddCell(goal.EmployeeComments);
                        PerformanceTable.AddCell(goal.ManagerRating);

                        PerformanceTable.AddCell(goal.ManagerComments);
                    }
                    else if(goal.GoalCategory_ID == 2)
                    {
                        CompetencyTable.AddCell(goal.Goal);
                        CompetencyTable.AddCell(goal.Priority.ToString());

                        CompetencyTable.AddCell(goal.EmployeeRating);
                        CompetencyTable.AddCell(goal.EmployeeComments);
                        CompetencyTable.AddCell(goal.ManagerRating);
                        CompetencyTable.AddCell(goal.ManagerComments);
                    }

                    else if (goal.GoalCategory_ID == 3)
                    {
                        LeaderTable.AddCell(goal.Goal);
                        LeaderTable.AddCell(goal.Priority.ToString());

                        LeaderTable.AddCell(goal.EmployeeRating);
                        LeaderTable.AddCell(goal.EmployeeComments);
                        LeaderTable.AddCell(goal.ManagerRating);
                        LeaderTable.AddCell(goal.ManagerComments);
                    }

                }

                document.AddAuthor("HR Application");
                document.AddCreator("Appraisal application");
                document.AddKeywords("PDF creation");
                document.AddSubject("Document subject - Describing the goals of appraisal");
                document.AddTitle("Appraisal Goals");

                // Open the document to enable you to write to the document  
                document.Open();
                // Add a simple and wellknown phrase to the document in a flow layout manner  
                Paragraph title;
                Font titleFont = FontFactory.GetFont("Arial", 24);
                title = new Paragraph("APPRAISAL", titleFont);
                title.Alignment = Element.ALIGN_CENTER;
                document.Add(title);
                document.Add(new Paragraph("Employee Details"));
                document.Add(new Paragraph("Name :"+ name));
                document.Add(new Paragraph("Designation :" + designation));
                document.Add(new Paragraph("Date of Joining :" + date.ToString("dd/MM/yyyy")));
                document.Add(new Paragraph("\n"));
                document.Add(new Paragraph("Performance goals"));
                document.Add(new Paragraph("\n"));
                document.Add(PerformanceTable);
                document.Add(new Paragraph("\n"));
                document.Add(new Paragraph("Competency goals"));
                document.Add(new Paragraph("\n"));
                document.Add(CompetencyTable);
                document.Add(new Paragraph("\n"));
                document.Add(new Paragraph("Leadership goals"));
                document.Add(new Paragraph("\n"));
                document.Add(LeaderTable);
                // Close the document  
                document.Close();
                // Close the writer instance  
                writer.Close();
                // Always close open filehandles explicity  
                fs.Close();
            }

            else

            {
                File.Delete("C:\\Users\\Sabarish.a\\Documents\\GitHub\\AppraisalApp\\Phase 2\\AppraisalAngular\\src\\assets\\pdfjs\\Appraisee-View.pdf");


                System.IO.FileStream fs = new FileStream("C:\\Users\\Sabarish.a\\Documents\\GitHub\\AppraisalApp\\Phase 2\\AppraisalAngular\\src\\assets\\pdfjs\\Appraisee-View.pdf", FileMode.Create);

                Document document = new Document(PageSize.A4, 25, 25, 30, 30);

                PdfWriter writer = PdfWriter.GetInstance(document, fs);

                PdfPTable PerformanceTable = new PdfPTable(4);
                PerformanceTable.TotalWidth = 500f;
                float[] widths = new float[] { 150f, 50f, 50f, 150f };
                PerformanceTable.SetWidths(widths);

                PerformanceTable.AddCell("Goal");
                PerformanceTable.AddCell("Weightage");

                PerformanceTable.AddCell("Employee Rating");
                PerformanceTable.AddCell("Employee Comments");
               

                PdfPTable CompetencyTable = new PdfPTable(4);
                CompetencyTable.TotalWidth = 500f;
                CompetencyTable.SetWidths(widths);

                CompetencyTable.AddCell("Goal");
                CompetencyTable.AddCell("Weightage");

                CompetencyTable.AddCell("Employee Rating");
                CompetencyTable.AddCell("Employee Comments");
           
                PdfPTable LeaderTable = new PdfPTable(4);
                LeaderTable.TotalWidth = 500f;
                LeaderTable.SetWidths(widths);

                LeaderTable.AddCell("Goal");
                LeaderTable.AddCell("Weightage");

                LeaderTable.AddCell("Employee Rating");
                LeaderTable.AddCell("Employee Comments");
          

                foreach (ProductGoals goal in list)
                {
                    if (goal.GoalCategory_ID == 1)
                    {

                        PerformanceTable.AddCell(goal.Goal);
                        PerformanceTable.AddCell(goal.Priority.ToString());

                        PerformanceTable.AddCell(goal.EmployeeRating);
                        PerformanceTable.AddCell(goal.EmployeeComments);
           
                    }
                    else if (goal.GoalCategory_ID == 2)
                    {
                        CompetencyTable.AddCell(goal.Goal);
                        CompetencyTable.AddCell(goal.Priority.ToString());

                        CompetencyTable.AddCell(goal.EmployeeRating);
                        CompetencyTable.AddCell(goal.EmployeeComments);
                   
                    }

                    else if (goal.GoalCategory_ID == 3)
                    {
                        LeaderTable.AddCell(goal.Goal);
                        LeaderTable.AddCell(goal.Priority.ToString());

                        LeaderTable.AddCell(goal.EmployeeRating);
                        LeaderTable.AddCell(goal.EmployeeComments);
                       
                    }

                }

                document.AddAuthor("HR Application");
                document.AddCreator("Appraisal application");
                document.AddKeywords("PDF creation");
                document.AddSubject("Document subject - Describing the goals of appraisal");
                document.AddTitle("Appraisal Goals");

                // Open the document to enable you to write to the document  
                document.Open();
                // Add a simple and wellknown phrase to the document in a flow layout manner  
                Paragraph title;
                Font titleFont = FontFactory.GetFont("Arial", 24);
                title = new Paragraph("APPRAISAL", titleFont);
                title.Alignment = Element.ALIGN_CENTER;
                document.Add(title);
                document.Add(new Paragraph("Employee Details"));
                document.Add(new Paragraph("Name :" + name));
                document.Add(new Paragraph("Designation :" + designation));
                document.Add(new Paragraph("Date of Joining :" + date.ToString("dd/MM/yyyy")));
                document.Add(new Paragraph("\n"));
                document.Add(new Paragraph("Performance goals"));
                document.Add(new Paragraph("\n"));
                document.Add(PerformanceTable);
                document.Add(new Paragraph("\n"));
                document.Add(new Paragraph("Competency goals"));
                document.Add(new Paragraph("\n"));
                document.Add(CompetencyTable);
                document.Add(new Paragraph("\n"));
                document.Add(new Paragraph("Leadership goals"));
                document.Add(new Paragraph("\n"));
                document.Add(LeaderTable);
                // Close the document  
                document.Close();
                // Close the writer instance  
                writer.Close();
                // Always close open filehandles explicity  
                fs.Close();
            }
        }

    }
}