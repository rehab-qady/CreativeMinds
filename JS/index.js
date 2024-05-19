var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");

var siteList = [];

if (localStorage.getItem("Site") != null) {
  siteList = JSON.parse(localStorage.getItem("Site"));
  displaySite(siteList);
}

function createSite() {
  if (validateSiteUrl() && validateSiteName()) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    siteList.push(site);
    localStorage.setItem("Site", JSON.stringify(siteList));
    displaySite(siteList);
    clearForm();
  } else {
    document.getElementById("isError").classList.remove('d-none');
  }
}

function displaySite(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += ` <tr>
       <td>${i}</td>
       <td>${list[i].name}</td>
       <td>
         <a href="${list[i].url}" class="bg-success">
           <button class="btn btn-success">
             <i class="fa-solid fa-eye"></i>
             visit
           </button>
         </a>
       </td>
       <td>
         <button class="btn btn-danger" onclick='deleteSite(${i})'>
           <i class="fa-solid fa-trash"></i>
           Delete
         </button>
       </td>
     </tr>`;
  }
  console.log(cartona);
  document.getElementById("data").innerHTML = cartona;
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteSite(index) {
  siteList.splice(index, 1);
  displaySite(siteList);
  localStorage.setItem("Site", JSON.stringify(siteList));
}

function validateSiteName() {
 
  var regex = /^[a-zA-Z]{3,}$/;
  if (regex.test(siteName.value)) {
    siteName.classList.replace("is-invalid", "is-valid");
   
    return true;
  } else {
    siteName.classList.add("is-invalid");
    return false;
  }
}
function validateSiteUrl() {
  var regex = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );

  if (regex.test(siteUrl.value)) {
    siteUrl.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    return false;
  }
}
var closeButton = document.getElementById("closeButton");
var container = document.getElementById("isError");

closeButton.addEventListener("click", function () {

  container.classList.add('d-none');
});
