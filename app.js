class HTTP {
  async ResData() {
    const Rdata = await fetch("data.json");
    const Data = await Rdata.json();
    return {
      Data: Data,
    };
  }
}
document.getElementById("search").addEventListener("keyup", function (e) {
  doc(e.target.value);
});

//------------------------------------//-----------------------
showCard();
function doc(string) {
  if (string !== "") {
    getData(string);
  } else {
    showCard();
  }
}

//---------------------------------//----------------------------

async function showCard() {
  const data = new HTTP();
  data.ResData().then((newData) => {
    for (let i = 0; i < newData.Data.length; i++) {
      //console.log(newData.Data[i]);

      const card = document.getElementById("card");
      const cardBody = document.createElement("div");
      //card.innerHTML = "";
      // console.log(data.ResData);
      cardBody.innerHTML = ` 
        <div class="card flag m-2" 
        style = "align-items: center;
        margin-top: 50px ;
        "> 
       <img
           src="${newData.Data[i].flags.png}"
           alt=""
           width="300px"
           
         />
         <h4>${newData.Data[i].name}</h4>
         <p>${newData.Data[i].region}</p>
         </div>     
   `;
      card.appendChild(cardBody);
    }
    card.addEventListener("click", (e) => {
      //console.log('okay');
      console.log(e.target.parentNode.id);
    });
  });
}

async function getData(value) {
  const data = new HTTP();
  data.ResData().then((newData) => {
    let re = new RegExp(`^${value}`, "i");

    const filteredData = newData.Data.filter((item) => re.test(item.name));
    const card = document.getElementById("card");
    filteredData.forEach((element) => {
      console.log(element.name);
      const cardBody = document.createElement("div");
      card.innerHTML = "";
      cardBody.innerHTML = ` 
           <div class="card m-2" 
           style = "align-items: center;
           margin-top: 50px ;"> 
          <img
              src="${element.flags.png}"
              alt=""
              width="300px"

            />
            <h4>${element.name}</h4>
            <p>${element.region}</p>
            </div>     
      `;
      card.appendChild(cardBody);
    });
  });
}
