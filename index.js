ZOHO.embeddedApp.on("PageLoad",async function(data)
    {
      console.log(data);
      const loanRec = await ZOHO.CRM.API.getRecord({Entity:data.Entity,RecordID:data.EntityId});
      // console.log(loanRec);
      console.log(loanRec.data[0].Recipient.id);
      const contactRec = await ZOHO.CRM.API.getRecord({Entity:"Contacts",RecordID:loanRec.data[0].Recipient.id});
      const loanHistory = await ZOHO.CRM.API.getRelatedRecords({Entity:"Contacts",RecordID:loanRec.data[0].Recipient.id,RelatedList:"Loan_History",page:1,per_page:200})
      displayBasicDetails(contactRec.data[0]);

      processLoanHistory(loanHistory.data); 
    })

    ZOHO.embeddedApp.init();
    function displayBasicDetails(data) {
      console.log(data);
      document.getElementById('name').textContent = data.Full_Name;
      document.getElementById('email').textContent = data.Email;
      document.getElementById('accountName').textContent = data.Phone;
    }

    function processLoanHistory(loanHistory) {
      var loanHistoryContainer = document.getElementById('loanHistory');
      loanHistory.forEach(function(loan, index) {
        var loanDiv = document.createElement('div');
        loanDiv.classList.add('loan');
        
        var title = document.createElement('h3');
        title.classList.add('loan-title');
        title.textContent = 'Loan ' + (index + 1);
        loanDiv.appendChild(title);
        
        var loanId = document.createElement('p');
        loanId.textContent = 'Loan ID: ' + loan.Name;
        loanDiv.appendChild(loanId);
        
        var loanAmount = document.createElement('p');
        loanAmount.textContent = 'Loan Amount: ' + loan.Amount;
        loanDiv.appendChild(loanAmount);
        
        // Add other loan details as needed
        var loanStatus = document.createElement('p');
        loanStatus.textContent = 'Loan Status: ' + loan.Loan_Status;
        loanDiv.appendChild(loanStatus);

        loanHistoryContainer.appendChild(loanDiv);
      });
    }