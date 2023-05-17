let cardWrap = document.querySelector('.card-wrap');
let data = null;

// 1. 상품목록 aiax로 가져오기
let insertData = function(response){
    const { products } = response; // 속성값을 직접 변수로 추출 (객체 비구조화 할당)
    products.forEach((a, i) => {
        let card =
        `<div class="card" draggable="true">
            <div class="img" draggable="false">
                <img src="${a.photo}" alt="${a.title}" draggable="false">
            </div>
            <div class="txt">
                <h5 class="product-title">${a.title}</h5>
                <p class="product-brand">${a.brand}</p>
                <h6 class="product-price">${a.price}</h6>
            </div>
            <div class="btn">
                <button class="cart-button" type="submit" name="addcart" value="cart">담기</button>
            </div>
        </div>`
        cardWrap.insertAdjacentHTML('beforeend', card)
    });
    return products;
}
fetch('data/store.json')
.then(res => res.json())
.then(response => { 
    data = insertData(response);
    
    // // 3. 장바구니로 상품을 드래그 + 담기 눌러도 추가되기 + 이미 있는 상품이면 카드생성이 아니라 수량만 증가
    // // 장바구니로 상품을 드래그
    // let cards = document.querySelectorAll('.card');
    // let dropZone = document.querySelector('.dropzone');
    // let dragged;
    // let cartBtns = document.querySelectorAll('.cart-button');
    // let cartNum = '1';
    // let priceTotal = document.querySelector('.price-total p');

    // cards.forEach((card) => {
    //     card.addEventListener('dragstart', e => {
    //         dragged = e.currentTarget;
    //         dragged.classList.add('dragging');
    //         draggedProductTitle = e.currentTarget.querySelector('.product-title').innerText;        
    //     })
    //     card.addEventListener('dragend', e => {
    //         dragged.classList.remove('dragging');
    //         dragged = null;
    //     })
    // })
    // dropZone.addEventListener("dragover", e => {
    //     e.preventDefault();
    // }, false);
    // dropZone.addEventListener("drop", e => {
    //     e.preventDefault();
    //     //최종가격 변수 선언
    //     let totalPrice = parseInt(priceTotal.innerHTML);

    //     // 드래그한 요소를 선택한 드롭 대상으로 이동
    //     if (dragged) {
    //         let existingCard = Array.from(dropZone.querySelectorAll('.card .product-title')).filter((productTit) => productTit.innerText === draggedProductTitle);
    //         // 카트가 비었을 시에 텍스트 제거
    //         if (dropZone.querySelectorAll('.card').length == 0){
    //             dropZone.textContent = "";
    //         // 같은 카드가 있을 시 개수만 증가
    //         }
    //         if (existingCard.length > 0 && existingCard[0].innerText === draggedProductTitle) {
    //             let currentCartNum = existingCard[0].parentNode.querySelector('.product-num');
    //             currentCartNum.value = `${parseInt(currentCartNum.value) + 1}`;
    //         } else {
    //             const { products } = response; // 속성값을 직접 변수로 추출 (객체 비구조화 할당)
    //             let cart =
    //             `<div class="card">
    //                 <div class="txt">
    //                     <h5 class="product-title">${dragged.querySelector('.product-title').innerText}</h5>
    //                     <p class="product-brand">${dragged.querySelector('.product-brand').innerText}</p>
    //                     <span class="split">|</span>
    //                     <input class="product-num" type="number" name="productnum" title="num" value="${cartNum}">
    //                     <h6 class="product-price">${dragged.querySelector('.product-price').innerText}</h6>
    //                 </div>
    //             </div>`
    //             dropZone.insertAdjacentHTML('beforeend', cart);
    //         }
            
    //         // 최종가격 업데이트
    //         if(Array.from(dropZone.querySelectorAll('.card')).length > 0){
    //             let priceTotalAll = dropZone.querySelectorAll('.card .product-price');
    //             let priceTotalCal = Array.from(priceTotalAll).reduce((acc, curr) => {
    //                 return parseInt(curr.innerHTML) * parseInt(curr.parentNode.querySelector('.product-num').value) + parseInt(acc)
    //             }, 0)
    //             priceTotal.innerHTML = `${priceTotalCal}원`;
    //         }
    //     }
    
    // });
    // // 담기 버튼 구현
    // cartBtns.forEach((cartBtn) => {
    //     cartBtn.addEventListener('click', function(e){
    //         clicked = e.currentTarget.parentNode.parentNode;
    //         let clickedProductTitle = clicked.querySelector('.product-title').innerText;        

    //         let existingCard = Array.from(dropZone.querySelectorAll('.card .product-title')).filter((productTit) => productTit.innerText === clickedProductTitle);
    //         // 카트가 비었을 시에 텍스트 제거
    //         if (dropZone.querySelectorAll('.card').length == 0){
    //             dropZone.textContent = "";
    //         // 같은 카드가 있을 시 개수만 증가
    //         }
    //         if (existingCard.length > 0 && existingCard[0].innerText === clickedProductTitle) {
    //             let currentCartNum = existingCard[0].parentNode.querySelector('.product-num');
    //             currentCartNum.value = `${parseInt(currentCartNum.value) + 1}`;
    //         } else {
    //             const { products } = response; // 속성값을 직접 변수로 추출 (객체 비구조화 할당)
    //             let cart =
    //             `<div class="card">
    //                 <div class="txt">
    //                     <h5 class="product-title">${clicked.querySelector('.product-title').innerText}</h5>
    //                     <p class="product-brand">${clicked.querySelector('.product-brand').innerText}</p>
    //                     <span class="split">|</span>
    //                     <input class="product-num" type="number" name="productnum" title="num" value="${cartNum}">
    //                     <h6 class="product-price">${clicked.querySelector('.product-price').innerText}</h6>
    //                 </div>
    //             </div>`
    //             dropZone.insertAdjacentHTML('beforeend', cart);
    //         }
            
    //         // 최종가격 업데이트
    //         if(Array.from(dropZone.querySelectorAll('.card')).length > 0){
    //             let priceTotalAll = dropZone.querySelectorAll('.card .product-price');
    //             let priceTotalCal = Array.from(priceTotalAll).reduce((acc, curr) => {
    //                 return parseInt(curr.innerHTML) * parseInt(curr.parentNode.querySelector('.product-num').value) + parseInt(acc)
    //             }, 0)
    //             priceTotal.innerHTML = `${priceTotalCal}원`;
    //         }
    //     });
    // });
})
.catch(error => { console.log(`패배자!`); })

//장바구니로 상품을 드래그하면
//
let cards=[];
let dragged =null;

document.addEventListener("dragstart", event => {
    console.log("dragging");
    dragged = event.target;
    dragged.classList.add('dragging');
});

document.addEventListener('dragend', event => {
            dragged.classList.remove('dragging');
});

document.querySelector('.dropzone').addEventListener("dragover",e=>{
    e.preventDefault();
    console.log('여기');
},false)

document.querySelector('.dropzone').addEventListener("drop",e=>{
    e.preventDefault();
    let titleName = dragged.querySelector('.product-title').innerText;
    cards.forEach(card => {
        if(card === )
    });
    dragged = null
    console.log('드롭');
    
},false)




  

// 2. 검색하면 해당하는 상품만 보여주기 + 찾은 글자에 배경색 입히기
const searchForm = document.querySelector('form[name="form-search"]');

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    let searchValue = document.querySelector('input.search').value;
    let searchResult = data.filter((product) => product.title.includes(searchValue));
    if (searchResult.length == 0){
        cardWrap.innerHTML = '<p>검색 결과가 없습니다.</p>';
    } else {
        cardWrap.innerHTML = "";
        searchResult.forEach((a, i) => {
            let card =
            `<div class="card" draggable="true">
                <div class="img" draggable="false">
                    <img src="${a.photo}" alt="${a.title}" draggable="false">
                </div>
                <div class="txt">
                    <h5 class="product-title">${a.title}</h5>
                    <p class="product-brand">${a.brand}</p>
                    <h6 class="product-price">${a.price}</h6>
                </div>
                <div class="btn">
                    <button class="cart-button" type="submit" name="addcart" value="cart">담기</button>
                </div>
            </div>`
            cardWrap.insertAdjacentHTML('beforeend', card)
        });
        Array.from(document.querySelectorAll('.product-title')).forEach((title) => {
            let titleText = title.textContent;
            let highlightText = titleText.replace(searchValue, `<span class="highlight">${searchValue}</span>`);
            title.innerHTML = highlightText;
        })
    }
});


// 5. 구매하기 누르면 모달창 띄우기
let btnOrder = document.querySelector('.btn-order');
let modalOrder = document.querySelector('.modal-order-bg');
let modalOrderClose = document.querySelector('.btn-modal_close');
function closeOrderModal(e){
    if (e.target === e.currentTarget){
        modalOrder.classList.remove('show');
    }
}
btnOrder.addEventListener('click', function(){
    modalOrder.classList.add('show');
})
modalOrder.addEventListener('click', closeOrderModal)
modalOrderClose.addEventListener('click', closeOrderModal)


// 6. 모달창에서 구매완료 누르면 영수증을 이미지형태로 보여주기
let btnReceipt = document.querySelector('.btn-modal_submit');
let modalReciept = document.querySelector('.modal-reciept-bg');
let modalRecieptClose = document.querySelector('.btn-modal_close');
function closeReceiptModal(e){
    if (e.target === e.currentTarget){
        modalReciept.classList.remove('show');
    }
}
btnReceipt.addEventListener('click', function(){
    modalOrder.classList.remove('show');
    modalReciept.classList.add('show');
})
modalReciept.addEventListener('click', closeReceiptModal)
modalRecieptClose.addEventListener('click', closeReceiptModal)

// 영수증
let now = new Date();
let year = now.getFullYear(); // 년도
let month = now.getMonth() + 1;  // 월
let date = now.getDate();  // 날짜
let day = now.getDay();  // 요일
let hours = now.getHours(); // 시
let minutes = now.getMinutes(); // 분
let seconds = now.getSeconds(); // 초
let newNow = year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds;

let canvas = document.getElementById('canvas'); 
let t = canvas.getContext('2d');
let c = canvas.getContext('2d');
t.font = '20px dotum';
t.font = '20px dotum';
t.fillText('인준덩이덩더이덩덩냄새나!!!!!!냄새!으디러', 30, 20);
c.fillText(`${newNow}`, 30, 50); 