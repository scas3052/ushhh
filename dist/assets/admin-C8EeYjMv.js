import{d as i,a as k}from"./firebase-config-Cnk58qAC.js";import{collection as m,onSnapshot as N,getDocs as E,doc as p,getDoc as M,deleteDoc as C,Timestamp as L,updateDoc as I,addDoc as B,query as F}from"https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";import{signOut as z}from"https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";let f=[],u=null,y=null,h="all",b=[],g=0;document.addEventListener("DOMContentLoaded",()=>{if(!sessionStorage.getItem("adminLoggedIn")){window.location.href="admin-login.html";return}T(),w(),D(),x(),q(),U()});function q(){const s=document.querySelector(".menu-toggle"),t=document.querySelector(".nav-close"),a=document.querySelector(".main-nav");s&&t&&a&&(s.addEventListener("click",()=>{a.classList.add("active")}),t.addEventListener("click",()=>{a.classList.remove("active")}),document.addEventListener("click",e=>{!a.contains(e.target)&&!s.contains(e.target)&&a.classList.remove("active")}))}function x(){var n,o;document.getElementById("logoutBtn").addEventListener("click",A),(n=document.getElementById("searchOrders"))==null||n.addEventListener("input",S),(o=document.getElementById("searchItems"))==null||o.addEventListener("input",O);const s=document.querySelectorAll(".status-filter-btn");s.forEach(r=>{r.addEventListener("click",()=>{s.forEach(l=>l.classList.remove("active")),r.classList.add("active"),h=r.dataset.status,S()})});const t=document.querySelectorAll(".nav-btn[data-section]");t.forEach(r=>{r.addEventListener("click",l=>{if(r.dataset.section){l.preventDefault(),t.forEach(c=>c.classList.remove("active")),r.classList.add("active");const d=r.dataset.section;document.getElementById("ordersSection").style.display=d==="orders"?"block":"none",document.getElementById("itemsSection").style.display=d==="items"?"block":"none",d==="items"&&w()}})});const a=document.getElementById("itemForm");a&&a.addEventListener("submit",P);const e=document.getElementById("frameTypeForm");e&&e.addEventListener("submit",H)}function U(){const s=m(i,"chatMetadata");N(s,t=>{g=0,t.forEach(n=>{const o=n.data();o.unreadCount&&o.lastMessage&&o.lastMessage.sender==="user"&&(g+=o.unreadCount)});const a=document.getElementById("adminUnreadCount"),e=document.querySelector(".floating-support-btn");a&&e?(a.textContent=g,e.style.display=(g>0,"flex"),console.log("Admin unread count:",g)):console.error("Floating support button elements not found")},t=>{console.error("Error listening to unread messages:",t)})}async function A(){try{await z(k),sessionStorage.removeItem("adminLoggedIn"),window.location.href="admin-login.html"}catch(s){console.error("Error signing out:",s)}}async function w(){try{const s=m(i,"items"),t=await E(s),a=document.getElementById("itemsGrid"),e=[];t.forEach(n=>{e.push({id:n.id,...n.data()})}),a.innerHTML=e.map(n=>`
            <div class="item-card">
                <div class="item-image">
                    <img src="${n.image}" alt="${n.name}">
                </div>
                <div class="item-info">
                    <h3>${n.name}</h3>
                    <p class="item-price">₹${n.price.toLocaleString()}</p>
                    <p class="item-stock ${n.stock<10?"low":""}">
                        Stock: ${n.stock} units
                    </p>
                    <div class="item-actions">
                        <button class="item-btn edit-item-btn" onclick="editItem('${n.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="item-btn delete-item-btn" onclick="deleteItem('${n.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join("")}catch(s){console.error("Error loading items:",s)}}window.showAddItemModal=function(){u=null,document.getElementById("itemModalTitle").textContent="Add New Item",document.getElementById("itemForm").reset(),document.getElementById("itemModal").classList.add("active")};window.closeItemModal=function(){document.getElementById("itemModal").classList.remove("active"),document.getElementById("itemForm").reset(),u=null};window.editItem=async function(s){try{const t=p(i,"items",s),a=await M(t);if(a.exists()){const e=a.data();u=s,document.getElementById("itemModalTitle").textContent="Edit Item",document.getElementById("itemName").value=e.name,document.getElementById("itemPrice").value=e.price,document.getElementById("itemStock").value=e.stock,document.getElementById("itemImage").value=e.image,document.getElementById("itemDescription").value=e.description,document.getElementById("itemMaterial").value=e.material,document.getElementById("itemSize").value=e.size,document.getElementById("itemModal").classList.add("active")}}catch(t){console.error("Error loading item:",t)}};window.deleteItem=async function(s){if(confirm("Are you sure you want to delete this item?"))try{await C(p(i,"items",s)),w()}catch(t){console.error("Error deleting item:",t)}};async function P(s){s.preventDefault();const t=s.target.querySelector('button[type="submit"]');t.disabled=!0;const a={name:document.getElementById("itemName").value,price:Number(document.getElementById("itemPrice").value),stock:Number(document.getElementById("itemStock").value),image:document.getElementById("itemImage").value,description:document.getElementById("itemDescription").value,material:document.getElementById("itemMaterial").value,size:document.getElementById("itemSize").value,timestamp:L.now()};try{u?await I(p(i,"items",u),a):await B(m(i,"items"),a),closeItemModal(),w(),alert(u?"Item updated successfully!":"Item added successfully!")}catch(e){console.error("Error saving item:",e),alert("Error saving item. Please try again.")}finally{t.disabled=!1}}function O(){const s=document.getElementById("searchItems").value.toLowerCase();document.querySelectorAll(".item-card").forEach(a=>{const n=a.querySelector("h3").textContent.toLowerCase().includes(s);a.style.display=n?"block":"none"})}async function T(){try{const s=m(i,"users"),t=await E(s);f=[];for(const a of t.docs){const e=a.data();e.orders&&e.orders.forEach(n=>{f.push({...n,customerName:`${e.firstName} ${e.lastName}`,customerEmail:e.email,customerPhone:e.phone||"Not provided",userId:a.id})})}f.sort((a,e)=>new Date(e.date)-new Date(a.date)),S()}catch(s){console.error("Error loading orders:",s)}}function S(){const s=document.getElementById("searchOrders").value.toLowerCase();let t=f;h!=="all"&&(t=t.filter(e=>h==="pending"?!e.shipped:h==="shipped"?e.shipped:!0)),s&&(t=t.filter(e=>e.customerName.toLowerCase().includes(s)||e.orderNumber.toLowerCase().includes(s)||e.customerEmail.toLowerCase().includes(s)));const a=document.getElementById("ordersTableBody");a&&(a.innerHTML=t.map(e=>`
            <tr>
                <td>${e.orderNumber}</td>
                <td>${e.customerName}</td>
                <td>${new Date(e.date).toLocaleDateString("en-IN")}</td>
                <td>₹${e.total.toLocaleString()}</td>
                <td><span class="order-status status-${e.status.toLowerCase()}">${e.status}</span></td>
                <td>
                    <span class="shipping-status ${e.shipped?"shipped":"pending"}">
                        ${e.shipped?"Shipped":"Pending"}
                    </span>
                    ${e.shipped?"":`
                        <button class="ship-btn" onclick="markAsShipped('${e.userId}', '${e.orderNumber}')">
                            Mark as Shipped
                        </button>
                    `}
                </td>
                <td>
                    <button class="view-details-btn" onclick="viewOrderDetails('${e.orderNumber}')">
                        View Details
                    </button>
                </td>
            </tr>
        `).join(""))}window.markAsShipped=async function(s,t){const a=document.querySelector(`button[onclick="markAsShipped('${s}', '${t}')"]`);if(!(!a||a.classList.contains("loading")))try{a.classList.add("loading"),a.disabled=!0;const e=a.innerHTML,n=p(i,"users",s),o=await M(n);if(o.exists()){const l=o.data().orders.map(d=>d.orderNumber===t?{...d,shipped:!0}:d);await I(n,{orders:l}),T()}}catch(e){console.error("Error marking order as shipped:",e),a.classList.remove("loading"),a.disabled=!1,a.innerHTML=originalText}};window.viewOrderDetails=function(s){const t=f.find(e=>e.orderNumber===s);if(!t)return;const a=document.getElementById("orderModalContent");a.innerHTML=`
        <div class="order-info-grid">
            <div class="info-group">
                <h4>Order Information</h4>
                <p><strong>Order Number:</strong> ${t.orderNumber}</p>
                <p><strong>Date:</strong> ${new Date(t.date).toLocaleString("en-IN")}</p>
                <p><strong>Status:</strong> ${t.status}</p>
                <p><strong>Shipping Status:</strong> ${t.shipped?"Shipped":"Pending"}</p>
                <p><strong>Payment Method:</strong> ${t.paymentMethod}</p>
                ${t.paymentId?`<p><strong>Payment ID:</strong> ${t.paymentId}</p>`:""}
            </div>
            <div class="info-group">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> ${t.customerName}</p>
                <p><strong>Email:</strong> ${t.customerEmail}</p>
                <p><strong>Phone:</strong> ${t.customerPhone}</p>
            </div>
            <div class="info-group">
                <h4>Shipping Address</h4>
                <p><strong>Recipient:</strong> ${t.address.name}</p>
                <p><strong>Phone:</strong> ${t.address.phone}</p>
                <p>${t.address.addressLine1}</p>
                ${t.address.addressLine2?`<p>${t.address.addressLine2}</p>`:""}
                <p>${t.address.city}, ${t.address.state} - ${t.address.pincode}</p>
            </div>
        </div>

        <div class="order-items-list">
            <h4>Order Items</h4>
            ${t.items.map(e=>`
                <div class="order-item">
                    <img src="${e.image}" alt="${e.name}">
                    <div class="item-details">
                        <h4>${e.name}</h4>
                        ${e.customText?`<p class="custom-text">Custom Text: "${e.customText}"</p>`:""}
                        <p>Quantity: ${e.quantity}</p>
                    </div>
                    <div class="item-total">
                        ₹${(e.price*e.quantity).toLocaleString()}
                    </div>
                </div>
            `).join("")}
        </div>

        <div class="order-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${t.subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Tax (18%):</span>
                <span>₹${t.tax.toLocaleString()}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>₹${t.total.toLocaleString()}</span>
            </div>
        </div>
    `,document.getElementById("orderModal").classList.add("active")};window.closeOrderModal=function(){document.getElementById("orderModal").classList.remove("active")};function v(s,t=!1){R();const a=document.createElement("div");a.className=t?"error-message":"success -message",a.innerHTML=`
        <i class="fas ${t?"fa-exclamation-circle":"fa-check-circle"}"></i>
        ${s}
    `;let e;document.querySelector(".modal.active")?e=document.querySelector(".modal.active .modal-content"):document.getElementById("itemsSection").style.display!=="none"?e=document.querySelector(".section-header"):e=document.querySelector(".admin-container"),e&&(e.insertAdjacentElement("afterbegin",a),setTimeout(()=>{a.remove()},5e3))}function R(){document.querySelectorAll(".error-message, .success-message").forEach(t=>t.remove())}async function D(){try{const s=m(i,"frameTypes"),t=await E(s);b=[],t.forEach(e=>{b.push({id:e.id,...e.data()})});const a=document.getElementById("itemMaterial");a&&(a.innerHTML=`
                <option value="">Select Frame Type</option>
                ${b.map(e=>`
                    <option value="${e.id}">${e.name}</option>
                `).join("")}
            `)}catch(s){console.error("Error loading frame types:",s),v("Failed to load frame types. Please refresh the page.",!0)}}window.showFrameTypeModal=function(){y=null,document.getElementById("frameTypeModalTitle").textContent="Add New Frame Type",document.getElementById("frameTypeForm").reset(),document.getElementById("frameTypeModal").classList.add("active")};window.closeFrameTypeModal=function(){document.getElementById("frameTypeModal").classList.remove("active"),document.getElementById("frameTypeForm").reset(),y=null};window.addImageUrlInput=function(){const s=document.getElementById("imageUrlInputs"),t=document.createElement("div");t.className="image-url-group",t.innerHTML=`
        <div class="form-group">
            <input type="text" class="frameImageUrl" placeholder="Enter image URL" required>
        </div>
        <a href="https://imgbb.com/" target="_blank" class="convert-image-btn">
            <i class="fas fa-image"></i>
            Convert Image
        </a>
        <button type="button" class="remove-image-btn" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `,s.appendChild(t)};async function H(s){s.preventDefault();const t=s.target.querySelector('button[type="submit"]');t.disabled=!0;try{const a=document.getElementById("frameTypeName").value,e=document.getElementById("frameDescription").value,n=Array.from(document.getElementsByClassName("frameImageUrl")).map(r=>r.value).filter(r=>r.trim()!=="");if(n.length===0)throw new Error("Please add at least one image URL");const o={name:a,description:e,images:n,timestamp:L.now()};y?await I(p(i,"frameTypes",y),o):await B(m(i,"frameTypes"),o),closeFrameTypeModal(),D(),v(y?"Frame type updated successfully!":"Frame type added successfully!",!1)}catch(a){console.error("Error saving frame type:",a),v(a.message||"Error saving frame type. Please try again.",!0)}finally{t.disabled=!1}}window.showFrameSizeModal=function(){document.getElementById("frameSizeModal").classList.add("active"),document.getElementById("frameSizeForm").reset()};window.closeFrameSizeModal=function(){document.getElementById("frameSizeModal").classList.remove("active"),document.getElementById("frameSizeForm").reset()};window.addSizeImageUrlInput=function(){const s=document.getElementById("sizeImageUrlInputs"),t=document.createElement("div");t.className="image-url-group",t.innerHTML=`
        <div class="form-group">
            <input type="text" class="frameSizeImageUrl" placeholder="Enter image URL" required>
        </div>
        <a href="https://imgbb.com/" target="_blank" class="convert-image-btn">
            <i class="fas fa-image"></i>
            Convert Image
        </a>
        <button type="button" class="remove-image-btn" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `,s.appendChild(t)};var $;($=document.getElementById("frameSizeForm"))==null||$.addEventListener("submit",async function(s){s.preventDefault();const t=s.target.querySelector('button[type="submit"]');t.disabled=!0;try{const a=document.getElementById("frameSize").value,e=Array.from(document.getElementsByClassName("frameSizeImageUrl")).map(c=>c.value).filter(c=>c.trim()!=="");if(e.length===0)throw new Error("Please add at least one image URL");const n={size:a,images:e,timestamp:L.now()},o=m(i,"frameSizes"),r=F(o),d=(await E(r)).docs.find(c=>c.data().size===a);d?await I(p(o,d.id),n):await B(o,n),closeFrameSizeModal(),v("Frame size images saved successfully!",!1)}catch(a){console.error("Error saving frame size:",a),v(a.message||"Error saving frame size. Please try again.",!0)}finally{t.disabled=!1}});
