import{d as m,a as M}from"./firebase-config-Cnk58qAC.js";/* empty css             */import{signOut as N}from"https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";import{doc as y,onSnapshot as k,collection as S,getDocs as T,query as $,orderBy as b,getDoc as I,updateDoc as D}from"https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";let h=null,L=null;document.addEventListener("DOMContentLoaded",()=>{O(),U(),A()});function U(){const e=document.querySelector(".menu-toggle"),s=document.querySelector(".nav-close"),t=document.querySelector(".main-nav"),n=document.querySelectorAll(".dropdown");e&&s&&t&&(e.addEventListener("click",()=>{t.classList.add("active")}),s.addEventListener("click",()=>{t.classList.remove("active")}),n.forEach(a=>{const i=a.querySelector(".dropdown-toggle");i&&i.addEventListener("click",r=>{r.preventDefault(),a.classList.toggle("active")})}),document.addEventListener("click",a=>{!t.contains(a.target)&&!e.contains(a.target)&&t.classList.remove("active")}))}function O(){const e=sessionStorage.getItem("loggedInUserId");if(!e){window.location.href="index.html";return}const s=y(m,"users",e);h=k(s,t=>{if(t.exists()){const n=t.data();document.getElementById("loggedUserFName").innerText=n.firstName||"",document.getElementById("loggedUserLName").innerText=n.lastName||""}else console.log("No document found matching id"),sessionStorage.removeItem("loggedInUserId"),window.location.href="index.html"}),H(e)}function H(e){const s=y(m,"chatMetadata",e);L=k(s,t=>{if(t.exists()){const n=t.data(),a=n.userUnreadCount||0,i=document.getElementById("unreadMessageCount"),r=document.querySelector(".floating-help-btn");i&&r?(i.textContent=a,a>0&&n.lastMessage&&n.lastMessage.sender==="admin"?(r.style.display="flex",i.style.display="block"):(r.style.display="none",i.style.display="none"),console.log("User unread count:",a)):console.error("Floating help button elements not found")}else console.log("No chat metadata found for user")})}function A(){let e=0;const s=document.getElementById("main-header");window.addEventListener("scroll",()=>{const t=window.pageYOffset;if(t<=0){s.classList.remove("hidden");return}t>e&&!s.classList.contains("hidden")?s.classList.add("hidden"):t<e&&s.classList.contains("hidden")&&s.classList.remove("hidden"),e=t})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("logout");e&&e.addEventListener("click",()=>{h&&h(),L&&L(),sessionStorage.removeItem("loggedInUserId"),N(M).then(()=>{window.location.href="index.html"}).catch(s=>{console.error("Error signing out:",s)})})});window.addEventListener("unload",()=>{h&&h(),L&&L()});let v=null,E=[];document.addEventListener("DOMContentLoaded",()=>{window.auth.checkAuth()&&(R(),j(),P(),z(),B())});function P(){const e=document.querySelector(".filter-toggle"),s=document.querySelector(".filters-section");e&&s&&(e.addEventListener("click",()=>{s.classList.toggle("active"),e.classList.toggle("active");const t=e.querySelector("i");t.classList.toggle("fa-times"),t.classList.toggle("fa-filter")}),document.addEventListener("click",t=>{if(!s.contains(t.target)&&!e.contains(t.target)){s.classList.remove("active"),e.classList.remove("active");const n=e.querySelector("i");n.classList.remove("fa-times"),n.classList.add("fa-filter")}}))}function z(){const e=document.getElementById("search-input"),s=document.getElementById("price-filter"),t=document.getElementById("size-filter"),n=document.getElementById("material-filter"),a=document.getElementById("style-filter");[e,s,t,n,a].forEach(r=>{r&&(r.addEventListener("change",x),r===e&&r.addEventListener("input",x))})}document.getElementById("size-filter").innerHTML=`
    <option value="">All Sizes</option>
    <option value="8x12">8" x 12"</option>
    <option value="10x15">10" x 15"</option>
    <option value="8x18">8" x 18"</option>
    <option value="12x18">12" x 18"</option>
    <option value="12x24">12" x 24"</option>
    <option value="18x36">18" x 36" (Premium)</option>
`;async function R(){try{const e=S(m,"frameTypes"),s=await T(e);E=[],s.forEach(n=>{const a=n.data();a.images&&Array.isArray(a.images)&&a.images.length>0&&E.push({id:n.id,...a,images:a.images.filter(i=>i&&typeof i=="string"&&i.trim()!=="")})});const t=document.getElementById("material-filter");t&&(t.innerHTML=`
                <option value="">All Materials</option>
                ${E.map(n=>`
                    <option value="${n.id}">${n.name}</option>
                `).join("")}
            `),x()}catch(e){console.error("Error loading frame types:",e)}}async function x(){const e=S(m,"items"),s=$(e,b("timestamp","desc")),t=await T(s),n=[];t.forEach(a=>{n.push({id:a.id,...a.data()})}),q(n)}async function B(){const e=document.querySelector(".cart-count"),s=sessionStorage.getItem("loggedInUserId");if(s){const t=y(m,"users",s),n=await I(t);if(n.exists()){const i=n.data().cart||[];e&&(e.textContent=i.reduce((r,d)=>r+d.quantity,0))}}}function j(){v&&v();const e=S(m,"items"),s=$(e,b("timestamp","desc"));v=k(s,t=>{let n=[];t.forEach(a=>{n.push({id:a.id,...a.data()})}),q(n)},t=>{console.error("Error listening to products:",t);const n=document.querySelector(".products-grid");n&&(n.innerHTML=`
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error loading frames</h3>
                    <p>Please try again later</p>
                </div>
            `)})}function q(e){var t,n,a,i,r;const s=document.querySelector(".products-grid");if(s)try{const d=(t=document.getElementById("price-filter"))==null?void 0:t.value,w=(n=document.getElementById("size-filter"))==null?void 0:n.value,f=(a=document.getElementById("material-filter"))==null?void 0:a.value,g=(i=document.getElementById("style-filter"))==null?void 0:i.value,p=(r=document.getElementById("search-input"))==null?void 0:r.value.toLowerCase();let l=[...e];if(p&&(l=l.filter(o=>{var c,u;return((c=o.name)==null?void 0:c.toLowerCase().includes(p))||((u=o.description)==null?void 0:u.toLowerCase().includes(p))})),d){const[o,c]=d.split("-").map(Number);l=l.filter(u=>c?u.price>=o&&u.price<=c:u.price>=o)}if(w&&(l=l.filter(o=>{var c;return(c=o.size)==null?void 0:c.toLowerCase().includes(w.toLowerCase())})),f&&(l=l.filter(o=>{var c;return((c=o.material)==null?void 0:c.toLowerCase())===f.toLowerCase()})),g&&(l=l.filter(o=>{var c;return((c=o.style)==null?void 0:c.toLowerCase())===g.toLowerCase()})),l.length===0){s.innerHTML=`
                <div class="no-products-message">
                    <i class="fas fa-box-open"></i>
                    <h3>No frames found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            `;return}const F=l.map(o=>{const c=E.find(u=>u.id===o.material);return{...o,frameTypeImages:c?c.images:[]}});s.innerHTML=F.map(o=>`
            <div class="product-card">
                <a href="frame-details.html?id=${o.id}" class="product-link" onclick="showFrameLoading(event)">
                    <div class="product-gallery">
                        <div class="gallery-container">
                            <div class="gallery-main">
                                <img src="${o.image||"https://via.placeholder.com/400x400?text=Image+Not+Found"}" 
                                     alt="${o.name}"
                                     class="active"
                                     onerror="this.src='https://via.placeholder.com/400x400?text=Image+Not+Found'">
                            </div>
                        </div>
                        ${o.stock<=0?`
                            <div class="out-of-stock-overlay">
                                Out of Stock
                            </div>
                        `:""}
                    </div>
                </a>
                <div class="product-info">
                    <a href="frame-details.html?id=${o.id}" class="product-title-link" onclick="showFrameLoading(event)">
                        <h3>${o.name}</h3>
                    </a>
                    <p class="price">₹${o.price.toLocaleString()}</p>
                    <p class="dimensions">${o.size}</p>
                    <p class="description">${o.description}</p>
                    <p class="stock-status ${o.stock<=5?"low-stock":""}">
                        ${o.stock<=0?"Out of Stock":o.stock<=5?`Only ${o.stock} left in stock!`:`${o.stock} in stock`}
                    </p>
                    <button 
                        onclick="addToCart('${o.id}'); event.preventDefault();" 
                        class="add-to-cart" 
                        id="addToCart-${o.id}"
                        ${o.stock<=0?"disabled":""}
                    >
                        <span class="spinner"></span>
                        <span class="button-text">
                            <i class="fas fa-shopping-cart"></i>
                            ${o.stock<=0?"Out of Stock":"Add to Cart"}
                        </span>
                    </button>
                </div>
            </div>
        `).join("")}catch(d){console.error("Error rendering products:",d),s.innerHTML=`
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error loading frames</h3>
                <p>Please try again later</p>
            </div>
        `}}window.showFrameLoading=function(e){const s=document.createElement("div");s.className="frame-loading-overlay",s.innerHTML=`
        <div class="frame-loading-spinner"></div>
        <p>Loading frame details...</p>
    `,document.body.appendChild(s)};function C(e,s=!0){const t=document.querySelector(".toast");t&&t.remove();const n=document.createElement("div");n.className="toast",n.innerHTML=`
        <i class="fas ${s?"fa-check-circle":"fa-exclamation-circle"}"></i>
        ${e}
    `,document.body.appendChild(n),n.addEventListener("animationend",a=>{a.animationName==="fadeOut"&&n.remove()})}window.addToCart=async function(e){const s=sessionStorage.getItem("loggedInUserId");if(!s)return;const t=document.getElementById(`addToCart-${e}`);if(!(!t||t.disabled)){t.disabled=!0,t.classList.add("loading");try{const n=y(m,"items",e),a=await I(n);if(a.exists()){const i=a.data(),r=y(m,"users",s),d=await I(r);if(d.exists()){const f=d.data().cart||[],g=f.find(p=>p.id===e);g?g.quantity+=1:f.push({id:e,name:i.name,price:i.price,image:i.image,quantity:1}),await D(r,{cart:f}),B(),C("Added to cart!",!0)}}}catch(n){console.error("Error adding to cart:",n),C("Failed to add to cart. Please try again.",!1)}finally{t.disabled=!1,t.classList.remove("loading")}}};window.addEventListener("unload",()=>{v&&v()});
