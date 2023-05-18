# Swiggy clone application
This project is a highly responsive swiggy-clone web application, built using Reactjs and Tailwindcss.

## Tools used
- Parcel 
- TailwindCss
- React-Router-Dom
- Google apis

<br/>

## Features
- Responsive Layout
- Forms
- Cards
- Accordion
- Data Fetching
- Animations
- Error Handling
- Responsive Images
- Nested Routes

>**Account creation**
- You can create accounts for user as well as flightAdmins.
- If the user is a customer, the account will automatically be approved on verification.
- In case of flightAdmin, a company admin will have to approve the account.
- JSON Web Token used for authentication.
- Users can also update some details like name, password and email.
- Admin can update additional details like userType and userStatus.
- User search is also available for users with proper authorization.



>**Flight API**
- A flight admin or an admin can create a new Flight, Edit their existing Flight and delete their existing flight.

>**FlightDate API**
- All registered users can get a list of all flights based on price, Start and Destination.
- All registered users can get a list of all the flights and the number of seats available.
- A flight Admin or an admin can add or remove the number of available seats of flight on a particular day.

>**Booking API**
- All registered users can create a new booking and update their existing booking.
- All registered users can get a list of all of their bookings as well as a single booking using bookingId.
- An admin can get the list of all the bookings.

>**Payment API**
- All registered users with a booking can create a payment for their booking.
- All payment have to be payed within 2min with a unique OTP sent to their emailId or else booking would be cancelled.
- All registered users can get a list of all of their payments as well as a single payment using paymentId.
- An admin can get the list of all the payments.

<br/>

## Dependencies
|npm modules|
|-|
|express|
|sequelize|
|MySQL|
|mongoose|
|jsonwebtoken|
|node-rest-client|
|dotenv|
|body-parser|
|bcryptjs|

|external applications|
|-|
|notification service application|
|otp-creator|

<br/>


