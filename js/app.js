const input = document.querySelector("#phone");
const ip = document.getElementById("ip");
const city = document.getElementById("city");
const country = document.getElementById("country");
var iti = window.intlTelInput(input, {
  // allowDropdown: false,
  // autoHideDialCode: false,
  // autoPlaceholder: "off",
  // dropdownContainer: document.body,
  // excludeCountries: ["us"],
  // formatOnDisplay: false,
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
      ip.value = resp.ip;
      city.value = resp.city;
      country.value = resp.country;
      var countryCode = resp && resp.country ? resp.country : "";
      success(countryCode);
    });
  },
  hiddenInput: "full",
  // initialCountry: "auto",
  // localizedCountries: { 'de': 'Deutschland' },
  // nationalMode: false,
  // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  // placeholderNumberType: "MOBILE",
  preferredCountries: ["us", "gb", "ca"],
  separateDialCode: true,
  utilsScript: "js/utils.js",
});

(errorMsg = document.querySelector("#error-msg")),
  (validMsg = document.querySelector("#valid-msg"));

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

// initialise plugin
// var iti = window.intlTelInput(input, {
//   utilsScript: "build/js/utils.js",
// });

var reset = function () {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};
// on blur: validate
input.addEventListener("blur", function (event) {
  reset();
  validation();
});

function validation() {
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
      return true;
    } else {
      input.classList.add("error");
      if (iti.getValidationError() < 0) {
        var errorCode = 0;
      } else {
        var errorCode = iti.getValidationError();
      }
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
      return false;
    }
  }
}
// on keyup / change flag: reset
input.addEventListener("change", reset);
input.addEventListener("keyup", reset);
