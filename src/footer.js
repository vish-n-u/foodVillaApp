import React from "react";

function App() {
  return (
    <div className="bg-gray-200 border-b-2 h-32">
      <div className="max-w-2xl mx-auto text-gray-900 py-5">
        <div className="text-center">
          <h3 className="text-xl mb-2">Download our app</h3>

          <div className="flex justify-center  my-6">
            <div className="flex items-center border bg-black text-white border-black rounded-md px-3 py-1 w-auto mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-6 md:w-7"
              />
              <div className="text-left ml-2">
                <p className="text-xs text-gray-200">Download on</p>
                <p className="text-sm md:text-base">Google Play</p>
              </div>
            </div>
            <div className="flex items-center bg-black text-white border border-black rounded-lg px-3 py-1 w-auto mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-6 md:w-7"
              />
              <div className="text-left ml-2 ">
                <p className="text-xs text-gray-200">Download on</p>
                <p className="text-sm md:text-base">App Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <>
      <App />
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4">
              <h2 className="text-2xl font-bold">Company</h2>
              <ul className="mt-4">
                <li className="mb-2">About Us</li>
                <li className="mb-2">Team</li>
                <li className="mb-2">Careers</li>
                <li className="mb-2">Blog</li>
                <li className="mb-2">Rapidosh Super</li>
                <li className="mb-2">Rapidosh Corporate</li>
                <li className="mb-2">Rapidosh Instamart</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h2 className="text-2xl font-bold">Contact</h2>
              <ul className="mt-4">
                <li className="mb-2">Help & Support</li>
                <li className="mb-2">Partner with us</li>
                <li className="mb-2">Ride with us</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h2 className="text-2xl font-bold">Legal</h2>
              <ul className="mt-4">
                <li className="mb-2">Terms & Conditions</li>
                <li className="mb-2">Refund & Cancellation</li>
                <li className="mb-2">Privacy Policy</li>
                <li className="mb-2">Cookie Policy</li>
                <li className="mb-2">Offer Terms</li>
                <li className="mb-2">Phishing & Fraud</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h2 className="text-2xl font-bold">Social</h2>
              <ul className="mt-4">
                <li className="mb-2">Facebook</li>
                <li className="mb-2">Twitter</li>
                <li className="mb-2">Instagram</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Rapidosh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
