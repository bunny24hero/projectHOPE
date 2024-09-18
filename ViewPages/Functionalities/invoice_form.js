document.getElementById('donation-form').addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Generate the invoice
    generateInvoice();
});

// function fetchLocation() {
//     const pincode = document.getElementById('pincode').value;

//     if (pincode.length === 6) {
//         // API call to fetch location based on pincode
//         fetch(`https://api.postalpincode.in/pincode/${pincode}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data[0].Status === "Success") {
//                     document.getElementById('city').value = data[0].PostOffice[0].Name || "N/A";
//                     document.getElementById('district').value = data[0].PostOffice[0].District || "N/A";
//                     document.getElementById('state').value = data[0].PostOffice[0].State || "N/A";
//                 } else {
//                     alert('Location not found. Please check the pincode.');
//                     document.getElementById('city').value = "N/A";
//                     document.getElementById('district').value = "N/A";
//                     document.getElementById('state').value = "N/A";
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching location:', error);
//                 alert('Failed to fetch location. Please try again later.');
//             });
//     } else {
//         alert('Please enter a valid 6-digit pincode.');
//     }
// }

function fetchLocation() {
    const pincode = document.getElementById('pincode').value;

    if (pincode.length === 6) {
        // API call to fetch location based on pincode
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => response.json())
            .then(data => {
                if (data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
                    document.getElementById('city').value = data[0].PostOffice[0].Name || "N/A";
                    document.getElementById('district').value = data[0].PostOffice[0].District || "N/A";
                    document.getElementById('state').value = data[0].PostOffice[0].State || "N/A";
                } else {
                    alert('Location not found. Please enter the details manually.');
                    document.getElementById('city').removeAttribute('readonly');
                    document.getElementById('district').removeAttribute('readonly');
                    document.getElementById('state').removeAttribute('readonly');
                }
            })
            .catch(error => {
                console.error('Error fetching location:', error);
                alert('Failed to fetch location. Please enter the details manually.');
                document.getElementById('city').removeAttribute('readonly');
                document.getElementById('district').removeAttribute('readonly');
                document.getElementById('state').removeAttribute('readonly');
            });
    } else {
        alert('Please enter a valid 6-digit pincode.');
    }
}





// function fetchLocation() {
//     const pincode = document.getElementById('pincode').value;

//     if (pincode.length === 6) {
//         // API call to fetch location based on pincode
//         fetch(`https://api.zippopotam.us/in/${pincode}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Location not found');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data.places && data.places.length > 0) {
//                     const place = data.places[0];
//                     document.getElementById('city').value = place['place name'] || "N/A";
//                     document.getElementById('district').value = place['state abbreviation'] || "N/A"; // You might need to handle this based on the actual structure of the data
//                     document.getElementById('state').value = place['state'] || "N/A";
//                 } else {
//                     alert('Location not found. Please enter the details manually.');
//                     document.getElementById('city').removeAttribute('readonly');
//                     document.getElementById('district').removeAttribute('readonly');
//                     document.getElementById('state').removeAttribute('readonly');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching location:', error);
//                 alert('Failed to fetch location. Please enter the details manually.');
//                 document.getElementById('city').removeAttribute('readonly');
//                 document.getElementById('district').removeAttribute('readonly');
//                 document.getElementById('state').removeAttribute('readonly');
//             });
//     } else {
//         alert('Please enter a valid 6-digit pincode.');
//     }
// }



function generateInvoice() {
    const declarationCheckbox = document.getElementById('declaration');
    const pan = document.getElementById('pan').value;
    const taxBenefitMessage = pan ? "You are eligible for a 50% tax benefit under Section 80G." : "";

    // Check if the checkbox is checked, if not alert the user
    if (!declarationCheckbox.checked) {
        alert('You must agree to the declaration before generating the invoice.');
        return;
    }

    const invoice = document.getElementById('invoice');
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const address = document.getElementById('address').value;
    const pincode = document.getElementById('pincode').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const state = document.getElementById('state').value;
    const donation = document.getElementById('donation').value;

    // Set the content of the invoice including the checkbox text if it's checked
    invoice.innerHTML = `
        <div class="logo">
            <img src=".\\Assets\\2kBrTVlKENCzlfxzuEZmjNiK43H.svg" alt="Logo">
        </div>
        <table>
            <tr>
                <th colspan="2">Donation Invoice</th>
            </tr>
            <tr>
                <td><strong>Name:</strong></td>
                <td>${name}</td>
            </tr>
            <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>${dob}</td>
            </tr>
            <tr>
                <td><strong>Email:</strong></td>
                <td>${email}</td>
            </tr>
            <tr>
                <td><strong>Phone:</strong></td>
                <td>+91 ${phone}</td>
            </tr>
            <tr>
                <td><strong>Country:</strong></td>
                <td>${country}</td>
            </tr>
            <tr>
                <td><strong>Address:</strong></td>
                <td>${address}</td>
            </tr>
            <tr>
                <td><strong>Pincode:</strong></td>
                <td>${pincode}</td>
            </tr>
            <tr>
                <td><strong>City/Taluka/Village:</strong></td>
                <td>${city}</td>
            </tr>
            <tr>
                <td><strong>District:</strong></td>
                <td>${district}</td>
            </tr>
            <tr>
                <td><strong>State:</strong></td>
                <td>${state}</td>
            </tr>
            <tr>
                <td><strong>PAN Card:</strong></td>
                <td>${pan}</td>
            </tr>
            <tr>
                <td><strong>Donation Amount:</strong></td>
                <td>₹${donation}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Declaration:</strong></td>
            </tr>
            <tr>
                <td colspan="2">${declarationCheckbox.checked ? 
                    "I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided above is correct to the best of my knowledge. I know that all further communications will be done on the contact details provided above." : ""}</td>
            </tr>
            ${pan ? `<tr><td colspan="2" style="color: green;"><strong>${taxBenefitMessage}</strong></td></tr>` : ""}
        </table>
    `;
    invoice.style.display = 'block';

    // Hide the form before printing
    document.getElementById('donation-form').style.display = 'none';

    // Print only the invoice content
    window.print();

    // Show the form again after printing
    document.getElementById('donation-form').style.display = 'block';
}
