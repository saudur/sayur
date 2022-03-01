const sayuran = [
    {
        id: 1,
        nama: "bayam",
        img: "./img/bayam.jpg",
        harga: 3000,
        deskripsi: "ini bayam",
        stock: 10
    },
    {
        id: 2,
        nama: "terong",
        img: "./img/terong.jpg",
        harga: 3000,
        deskripsi: "ini terong",
        stock: 10
    },
    {
        id: 3,
        nama: "kangkung",
        img: "./img/kangkung.jpg",
        harga: 3000,
        deskripsi: "ini kangkung",
        stock: 10
    },
    {
        id: 4,
        nama: "kecambah",
        img: "./img/kecambah.jpg",
        harga: 3000,
        deskripsi: "ini kecambah",
        stock: 10
    },
    {
        id: 5,
        nama: "sawi",
        img: "./img/sawi.jpg",
        harga: 3000,
        deskripsi: "ini sawi",
        stock: 10
    },
    {
        id: 6,
        nama: "wortel",
        img: "./img/carrot.jpg",
        harga: 3000,
        deskripsi: "ini wortel",
        stock: 10
    },
    {
        id: 7,
        nama: "timun",
        img: "./img/timun.png",
        harga: 3000,
        deskripsi: "ini timun",
        stock: 10
    },
    {
        id: 8,
        nama: "kentang",
        img: "./img/kentang.png",
        harga: 3000,
        deskripsi: "ini kentang",
        stock: 10
    }
];

// tampilan card
function generateVeg(arr) {
    let containerSayuran = document.getElementById("card-sayuran");
    containerSayuran.innerHTML = ""; // reset html

    for (let i = 0; i < arr.length; i++) {
        let template = `<div class="col-3 mt-5">
        <div class="card text-center" style="width: 18rem;">
            <img src=${arr[i].img} class="card-img-top img-sayur" alt="...">
            <div class="card-body">
              <h5 class="card-title">${arr[i].nama}</h5>
              <p class="card-text">${arr[i].deskripsi}</p>
              <p class="fw-bold">Rp. ${arr[i].harga}</p>
              <p class="text-muted">Stock : ${arr[i].stock}</p>
              <a onclick="totalHarga(${arr[i].id})" class="btn btn-primary"> <img src="./img/shopping-cart.svg" >Add to Cart</a>
            </div>
        </div>
    </div>`;

    containerSayuran.innerHTML += template;
    }
}

generateVeg(sayuran);

let objSayur = {};
//expected result objSayur
// let objSayur = {
    //     sawi: [10, 30000],
    //     wortel: [5, 15000],
    //     total: 45000
    // };
    
let jumlahHarga = 0;
//function untuk menghitung total harga
function totalHarga(id){
    for (let i = 0; i < sayuran.length; i++) {  
        if (id === sayuran[i].id) {
            if(sayuran[i].stock === 0) {
                break; 
            }
            
            sayuran[i].stock--;
            jumlahHarga += sayuran[i].harga;
            if (!objSayur[sayuran[i].nama]) {
                objSayur[sayuran[i].nama] = [1, sayuran[i].harga];
            }
            else {
                objSayur[sayuran[i].nama] = [objSayur[sayuran[i].nama][0] + 1, objSayur[sayuran[i].nama][1] + sayuran[i].harga];
            }
            break;
        }
    }

    generateVeg(sayuran);

    console.log(objSayur);
}

//event click pada nav checkout
let navCheckout = document.getElementById("checkout");
navCheckout.addEventListener("click", function () { 
    tampilTable();
});

// let objSayur = {
    //     sawi: [10, 30000],
    //     wortel: [5, 15000],
    // };
function tampilTable(){
    let tampilanTable = document.getElementById("konten-modal-table");
    tampilanTable.innerHTML = "";
    for (let key in objSayur) {  
        let tampilTotal = objSayur[key][0];
        let tampilHarga = objSayur[key][1];
        let template = `
        <tr>
            <th>${key}</th>
            <td>${tampilTotal}</td>
            <td>Rp. ${tampilHarga}</td>
        </tr>
        `;
        tampilanTable.innerHTML += template;
    }

    let tampilanTotal = document.getElementById("total-harga");
    tampilanTotal.innerText = `Total pembelian Anda sebesar : Rp. ${jumlahHarga}`;

}

let nomorPengiriman = "BRI - 14297055429";
let pengiriman = 0;

//function cek radio button metode pembayaran
function cekMetodePembayaran(value) {
    if (value === "transfer") {
        nomorPengiriman = "BRI - 14297055429";
    } else if (value === "gopay") {
        nomorPengiriman = "Gopay - 082149240592"

    } else if (value === "ovo") {
        nomorPengiriman = "OVO - 082149240592"
    }
}

//function cek radio button metode pengiriman
function cekPengiriman(value) {
    if (value === "jawa") {
        pengiriman = 0;
    } else if (value === "luar-jawa") {
        pengiriman = 15000;
    }
}

let transaksi = document.getElementById("lanjut-checkout");
transaksi.addEventListener("click", function () { 
    tampilCheckout();
});

function tampilCheckout(){
    let tampilanModal= document.getElementById("konten-modal-kedua");
    tampilanModal.innerHTML = "";

    let template = `
    <p>Total Belanja : Rp. ${jumlahHarga}</p>
    <p>Biaya ongkir  : Rp. ${pengiriman}</p>
    <p>Total Transaksi : Rp. ${jumlahHarga + pengiriman}</p>
    <p>silahkan melakukan transaksi dengan nomor ${nomorPengiriman}</p>
    `;
    tampilanModal.innerHTML = template;
}
