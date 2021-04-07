document.getElementById("submit-btn").addEventListener('click', function (){
foo()
}) 
async function foo ()
{
    
    var e = document.getElementById("user-select");
    var strUser = e.options[e.selectedIndex].text;
    var response = await getData(e.selectedIndex);
    console.log (response)
    if(response)
    {
        hideLoader();
    }
    var totalBalance = getTotalBalance (response);
    displayData(response);

    document.getElementById("user-name").innerHTML = strUser;
    document.getElementById("user-balance").innerHTML = "Balance:" + totalBalance ; 
    
}

const getData = async (id) => {
    const result = await fetch(`https://jsonmock.hackerrank.com/api/transactions?userId=${id}`)
    const response = await result.json();
    return response;
}

function getTotalBalance (response)
{
    var totalAmount = 0;
    if(response.data.length > 0)
    {
        response.data.forEach(element => {
           var amount =  Number(element.amount.replace(/[^0-9.-]+/g,""));
           if (element.txnType === 'debit')
           {
               totalAmount = totalAmount - amount;
           }
           else{
               totalAmount = totalAmount + amount;
           }
       });
    }
    return totalAmount;
}

function displayData (response)
{
    if(response.data.length > 0)
    {
       var classNameAmt = '';
        var table = document.getElementById('myTable')
        table.innerHTML = `  <tr>
        <th>Amount</th>
        <th>Transaction Type</th>
        <th>Location</th>
        <th>IP Address</th>
    </tr>`
		for (var i = 0; i < response.data.length; i++){
            if(response.data[i].txnType === 'debit')
            {
                classNameAmt = "monthly-debit"
            }
            else
            {
                classNameAmt = "monthly-credit" 
            }
			var row = `<tr class = "statement-card">
							<td class = ${classNameAmt}>${response.data[i].amount}</td>
                            <td>${response.data[i].txnType}</td>
                            <td>${response.data[i].location.address}, ${response.data[i].location.city}, ${response.data[i].location.zipCode}</td>
                            <td>${response.data[i].ip}</td>
					  </tr>`
			table.innerHTML += row
        
    }
    
}
}

function hideLoader() {
    var div = document.getElementById('loader-view');
    div.style.display = 'none';
    }
