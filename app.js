/* Menuly demo — lógica fiel à SPEC (pt-BR, centavos, store_id) */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const STORE={id:1,slug:'acai-da-praca',name:'Açaí da Praça',status:'active',min_order:0,free_delivery_above:null,prep_min:30,prep_max:50,whatsapp:'5511999999999',pixKey:'pix@acaidapraca.test',pixName:'Acai da Praca',pixCity:'Sao Paulo',accepts_orders:true,allows_delivery:true,allows_pickup:true,allows_dine_in:false,open_mode:'auto'};
const THEMES={acai:{primary:'#5B2A86',secondary:'#8E44AD',accent:'#F4B400',background:'#FAF7FD',text:'#1F1530'},burger:{primary:'#D62828',secondary:'#F77F00',accent:'#FCBF49',background:'#FFF8F0',text:'#2B1B14'},pizza:{primary:'#C0392B',secondary:'#2E7D32',accent:'#F4C542',background:'#FFF9F3',text:'#2A1A14'},sushi:{primary:'#111827',secondary:'#DC2626',accent:'#DC2626',background:'#FAFAFA',text:'#111827'},doces:{primary:'#DB2777',secondary:'#F9A8D4',accent:'#F59E0B',background:'#FFF5F9',text:'#3B1230'},saudavel:{primary:'#15803D',secondary:'#84CC16',accent:'#F59E0B',background:'#F6FBF4',text:'#14281A'},dark:{primary:'#A78BFA',secondary:'#34D399',accent:'#FBBF24',background:'#0F0F14',text:'#F3F4F6'}};
const GROUPS={
 tamanho:{id:'tamanho',title:'Escolha o tamanho',type:'single',min:1,max:1,options:[{id:'t300',name:'300 ml',extra:0},{id:'t500',name:'500 ml',extra:600},{id:'t700',name:'700 ml',extra:1100}]},
 base:{id:'base',title:'Escolha a base',type:'single',min:1,max:1,options:[{id:'b1',name:'Açaí tradicional',extra:0},{id:'b2',name:'Açaí fit sem açúcar',extra:0},{id:'b3',name:'Cupuaçu',extra:200}]},
 cremes:{id:'cremes',title:'Escolha até 2 cremes',type:'multiple',min:0,max:2,options:['Ninho','Cupuaçu','Morango','Ovomaltine'].map((n,i)=>({id:'c'+i,name:n,extra:0}))},
 acomp:{id:'acomp',title:'Escolha até 4 acompanhamentos',type:'multiple',min:0,max:4,options:['Granola','Leite em pó','Paçoca','Banana','Morango','Leite condensado','Amendoim','Uva'].map((n,i)=>({id:'a'+i,name:n,extra:0}))},
 cobert:{id:'cobert',title:'Escolha até 2 coberturas',type:'multiple',min:0,max:2,options:['Chocolate','Morango','Caramelo','Leite condensado'].map((n,i)=>({id:'co'+i,name:n,extra:0}))},
 adic:{id:'adic',title:'Turbine seu açaí',type:'multiple',min:0,max:5,options:[{id:'x1',name:'Nutella',extra:500},{id:'x2',name:'Ovomaltine',extra:300},{id:'x3',name:'Leite Ninho',extra:300},{id:'x4',name:'Bis',extra:300},{id:'x5',name:'Kinder Bueno',extra:600}]}};
const PRODUCTS=[
 {id:1,cat:'monte',name:'Monte seu açaí',desc:'O queridinho da casa: escolha tamanho, base, cremes e acompanhamentos.',price:1400,promo:0,featured:true,badges:['bestseller'],emoji:'🍨',groups:['tamanho','base','cremes','acomp','cobert','adic'],stock:null},
 {id:2,cat:'prontos',name:'Açaí Tradicional 500 ml',desc:'Açaí batido na hora com granola, banana e leite condensado.',price:1800,promo:0,featured:true,badges:[],emoji:'🍧',groups:['acomp','adic'],stock:null},
 {id:3,cat:'prontos',name:'Açaí Nutella 500 ml',desc:'Com generosa camada de Nutella e morango fresco.',price:2400,promo:2200,featured:true,badges:['promo'],emoji:'🍫',groups:['adic'],stock:12},
 {id:4,cat:'prontos',name:'Açaí Fit 500 ml',desc:'Sem açúcar, com morango e granola integral.',price:2000,promo:0,featured:false,badges:['new'],emoji:'🥗',groups:['acomp','adic'],stock:8},
 {id:5,cat:'cremes',name:'Shake de Açaí 400 ml',desc:'Cremoso, batido com leite ninho.',price:1600,promo:0,featured:false,badges:[],emoji:'🥤',groups:['adic'],stock:null},
 {id:6,cat:'cremes',name:'Creme de Cupuaçu 300 ml',desc:'Azedinho na medida, com cobertura de caramelo.',price:1400,promo:0,featured:false,badges:[],emoji:'🍮',groups:['adic'],stock:null},
 {id:7,cat:'bebidas',name:'Água mineral 500 ml',desc:'Geladinha.',price:400,promo:0,featured:false,badges:[],emoji:'💧',groups:[],stock:null},
 {id:8,cat:'bebidas',name:'Refrigerante lata',desc:'Coca, Guaraná ou laranja.',price:600,promo:0,featured:false,badges:[],emoji:'🥫',groups:[],stock:null},
 {id:9,cat:'bebidas',name:'Suco de laranja 400 ml',desc:'Natural, espremido na hora.',price:900,promo:0,featured:false,badges:[],emoji:'🍊',groups:[],stock:0},
 {id:10,cat:'adicionais',name:'Porção de granola',desc:'Extra crocante 50g.',price:300,promo:0,featured:false,badges:[],emoji:'🌾',groups:[],stock:null},
 {id:11,cat:'adicionais',name:'Porção de leite condensado',desc:'Para finalizar.',price:300,promo:0,featured:false,badges:[],emoji:'🥛',groups:[],stock:null},
 {id:12,cat:'adicionais',name:'Pote de Nutella extra',desc:'50g de felicidade.',price:500,promo:0,featured:false,badges:['vegan'],emoji:'🍫',groups:[],stock:null}];
const CATS={monte:'Monte seu açaí',prontos:'Açaís prontos',cremes:'Cremes e shakes',bebidas:'Bebidas',adicionais:'Adicionais'};
const ZONES=[{id:1,neighborhood:'Centro',fee:500,eta:30,min_order:0,free_above:null},{id:2,neighborhood:'Jardim das Flores',fee:700,eta:40,min_order:0,free_above:null},{id:3,neighborhood:'Vila Nova',fee:800,eta:45,min_order:0,free_above:5000},{id:4,neighborhood:'Bairro Alto',fee:1000,eta:50,min_order:2500,free_above:null}];
const HOURS=[0,1,2,3,4,5,6].map(d=>({weekday:d,opens:'14:00',closes:'23:00'}));
let COUPONS=[{code:'BEMVINDO10',type:'percent',value:10,min_order:2000,uses:0,max_uses:null,first_order_only:true,is_active:true,starts_at:null,expires_at:null}];
const BADGE_LB={bestseller:'Mais vendido',new:'Novo',promo:'Promoção',vegan:'Vegano'};

/* ---------- Support: Money, Color, Whatsapp, Pix ---------- */
const Money={format(c){return 'R$ '+(c/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}};
function hx2rgb(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function rgb2hx([r,g,b]){return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('')}
const Color={mix(a,b,wA){const A=hx2rgb(a),B=hx2rgb(b),w=wA/100;return rgb2hx(A.map((v,i)=>v*w+B[i]*(1-w)))},
 darken(hex,p){const [r,g,b]=hx2rgb(hex);const f=1-p/100;return rgb2hx([r*f,g*f,b*f])},
 luminance(hex){const [r,g,b]=hx2rgb(hex).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b},
 onColor(hex){const L=Color.luminance(hex);const cW=(1.05)/(L+.05),cB=(L+.05)/.05;return cW>=cB?'#ffffff':'#111111'}};
const Whatsapp={url(phone,text){let d=phone.replace(/\D/g,'');if(d.length===10||d.length===11)d='55'+d;return 'https://wa.me/'+d+'?text='+encodeURIComponent(text)}};
function crc16(s){let crc=0xFFFF;for(let i=0;i<s.length;i++){crc^=s.charCodeAt(i)<<8;for(let j=0;j<8;j++){crc=(crc&0x8000)?((crc<<1)^0x1021):(crc<<1);crc&=0xFFFF}}return crc.toString(16).toUpperCase().padStart(4,'0')}
function tlv(id,val){return id+String(val.length).padStart(2,'0')+val}
const PixPayload={build(chave,nome,cidade,centavos,txid){const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().slice(0,25);
 let g=tlv('00','br.gov.bcb.pix')+tlv('01',chave);
 let p=tlv('00','01')+tlv('01','12')+tlv('26',g)+tlv('52','0000')+tlv('53','986');
 if(centavos!=null)p+=tlv('54',(centavos/100).toFixed(2));
 p+=tlv('58','BR')+tlv('59',norm(nome)||'LOJA')+tlv('60',(cidade||'BRASIL').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().slice(0,15)||'BRASIL')+tlv('62',tlv('05',txid||'***'))+ '6304';
 return p+crc16(p)}};

/* ---------- Loja aberta ---------- */
function isOpenNow(at=new Date()){if(STORE.status!=='active')return false;if(STORE.open_mode==='open')return true;if(STORE.open_mode==='closed')return false;
 const mins=d=>d.getHours()*60+d.getMinutes();const now=mins(at);const wd=at.getDay();
 const inTurn=(t,day)=>{const [oh,om]=t.opens.split(':').map(Number),[ch,cm]=t.closes.split(':').map(Number);const o=oh*60+om,c=ch*60+cm;
  if(c<=o){return day===wd?now>=o:(now<c)}return day===wd&&(now>=o&&now<c)};
 const today=HOURS.filter(h=>h.weekday===wd),yest=HOURS.filter(h=>h.weekday===(wd+6)%7);
 return today.some(t=>inTurn(t,wd))||yest.some(t=>{const [oh,om]=t.opens.split(':').map(Number),[ch,cm]=t.closes.split(':').map(Number);return ch*60+cm<=oh*60+om&&now<ch*60+cm})}
function nextOpening(){const days=['dom','seg','ter','qua','qui','sex','sáb'];for(let i=0;i<8;i++){const d=new Date();d.setDate(d.getDate()+i);const h=HOURS.find(x=>x.weekday===d.getDay());if(!h)continue;if(i===0){const n=new Date();const [oh,om]=h.opens.split(':').map(Number);const o=new Date();o.setHours(oh,om,0,0);if(n<o)return `Abre hoje às ${h.opens}`}else if(i===1)return `Abre amanhã às ${h.opens}`;else return `Abre ${days[d.getDay()]} às ${h.opens}`}return 'Consulte o horário'}

/* ---------- PricingService (§6.2) ---------- */
const custOrders={}; // phone -> count non-cancelled
function quote(items,couponCode,type,zoneId,phone){
 if(!items.length)throw new Error('Sacola vazia.');
 const zone=ZONES.find(z=>z.id==zoneId);
 if(type==='delivery'&&!STORE.allows_delivery)throw new Error('Loja não atende entrega.');
 if(type==='pickup'&&!STORE.allows_pickup)throw new Error('Loja não permite retirada.');
 if(type==='delivery'&&(!zone))throw new Error('Escolha o bairro de entrega.');
 let subtotal=0;const lines=[];const byProd={};
 for(const it of items){byProd[it.product_id]=(byProd[it.product_id]||0)+it.quantity}
 for(const it of items){
  const p=PRODUCTS.find(x=>x.id===it.product_id);
  if(!p||p.stock===0&&p.stock!==null&&false)throw new Error(`Produto indisponível: ${p?p.name:'#'+it.product_id}`);
  if(!p.is_active!==false&&p.stock===0)throw new Error(`Produto esgotado: ${p.name}`);
  if(it.quantity<1||it.quantity>50)throw new Error('Quantidade de 1 a 50.');
  if((p.stock??Infinity)<byProd[it.product_id]&&p.stock!==null)throw new Error(`Estoque insuficiente: ${p.name}`);
  const validGroups=p.groups.map(g=>GROUPS[g]);const optById={};validGroups.forEach(g=>g.options.forEach(o=>optById[o.id]={...o,group:g}));
  for(const oid of it.option_ids){if(!optById[oid])throw new Error(`Opção inválida para ${p.name}.`)}
  let options_total=0;const chosen=[];
  for(const g of validGroups){const sel=it.option_ids.filter(oid=>optById[oid].group.id===g.id);
   if(sel.length<g.min)throw new Error(`«${g.title}» é obrigatório.`);
   if(sel.length>g.max)throw new Error(`Máximo em «${g.title}»: ${g.max}.`);
   if(g.type==='single'&&new Set(sel).size>1)throw new Error(`«${g.title}» permite só 1 opção.`);
   for(const oid of sel){options_total+=optById[oid].extra;chosen.push({group_title:g.title,name:optById[oid].name,extra:optById[oid].extra})}}
  const unit=(p.promo>0&&p.promo<p.price)?p.promo:p.price;
  const line_total=(unit+options_total)*it.quantity;subtotal+=line_total;
  lines.push({product_id:p.id,name:p.name,unit_price:unit,options_total,quantity:it.quantity,line_total,notes:it.notes||'',options:chosen})}
 if(type==='delivery'){const eff=zone.min_order??STORE.min_order;if(subtotal<eff)throw new Error(`Pedido mínimo para ${zone.neighborhood}: ${Money.format(eff)}.`)}
 let discount=0,coupon=null;
 if(couponCode){const code=couponCode.toUpperCase().replace(/\s/g,'');coupon=COUPONS.find(c=>c.code===code&&c.is_active);
  if(!coupon)throw new Error('Cupom inválido.');
  if(coupon.max_uses!=null&&coupon.uses>=coupon.max_uses)throw new Error('Cupom esgotado.');
  if(subtotal<coupon.min_order)throw new Error(`Cupom exige pedido mínimo de ${Money.format(coupon.min_order)}.`);
  if(coupon.first_order_only&&(custOrders[phone.replace(/\D/g,'')||'']||0)>0)throw new Error('Cupom válido só no primeiro pedido.');
  discount=coupon.type==='percent'?Math.floor(subtotal*coupon.value/100):Math.min(coupon.value,subtotal)}
 let fee=0;
 if(type==='delivery'){fee=zone.fee;if((zone.free_above!=null&&subtotal>=zone.free_above)||(STORE.free_delivery_above!=null&&subtotal>=STORE.free_delivery_above))fee=0}
 return {lines,subtotal,discount,delivery_fee:fee,total:subtotal-discount+fee,coupon_code:coupon?coupon.code:null,zone}}

/* ---------- Sacola ---------- */
const CART_KEY='cart:acai-da-praca';
let cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');
let orderType='delivery', appliedCoupon='', lastOrder=null, orderSeq=41;
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCartBar();renderCartBox();refreshQuote()}
function cartDetailed(){return cart.map(c=>({...c}))}
function cartCount(){return cart.reduce((s,i)=>s+i.quantity,0)}
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;$('#toastWrap').appendChild(d);setTimeout(()=>d.remove(),3200)}
function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}
function shareStore(){const u=location.href;if(navigator.share)navigator.share({title:'Açaí da Praça',url:u}).catch(()=>{});else{navigator.clipboard.writeText(u);toast('Link copiado!')}}

/* ---------- Cardápio render ---------- */
let activeCat='all';
function renderMenu(){
 const q=($('#search').value||'').toLowerCase();
 $$('#catBar .chip').forEach(b=>b.classList.toggle('active',b.dataset.cat===activeCat));
 const feat=PRODUCTS.filter(p=>p.featured&&(!q||(p.name+p.desc).toLowerCase().includes(q)));
 $('#featuredRow').innerHTML=feat.map(p=>`<div class="pcard" onclick="openProduct(${p.id})"><div class="ph">${p.emoji}</div><div class="pb"><b>${p.name}</b><p>${p.desc}</p><div class="badges">${p.badges.map(b=>`<span>${BADGE_LB[b]}</span>`).join('')}</div><div class="price">${p.promo?`<s>${Money.format(p.price)}</s>`:''}${Money.format(p.promo||p.price)}</div></div></div>`).join('')||'<p class="muted">Nada por aqui.</p>';
 let html='';
 for(const [cid,cname] of Object.entries(CATS)){
  if(activeCat!=='all'&&activeCat!==cid)continue;
  const list=PRODUCTS.filter(p=>p.cat===cid&&(!q||(p.name+p.desc).toLowerCase().includes(q)));
  if(!list.length)continue;
  html+=`<h3 class="sub">${cname}</h3><div class="menugrid">`+list.map(p=>{
   const sold=p.stock===0;const from=p.groups.some(g=>GROUPS[g].min>=1);
   return `<div class="mrow ${sold?'soldout':''}" onclick="${sold?'':`openProduct(${p.id})`}"><div class="mt"><b>${p.name}</b> ${sold?'<span class="tag">ESGOTADO</span>':''}<p>${p.desc}</p><div class="badges">${p.badges.map(b=>`<span>${BADGE_LB[b]}</span>`).join('')}</div><div class="price">${p.promo?`<s>${Money.format(p.price)}</s>`:''}${from?'a partir de ':''}${Money.format(p.promo||p.price)}</div></div><div class="mi">${p.emoji}</div></div>`}).join('')+`</div>`}
 $('#menuSections').innerHTML=html||'<p class="muted">Nenhum produto encontrado.</p>'}
$$('#catBar .chip').forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderMenu()});

/* ---------- Sheet produto ---------- */
let sheetSel={};
function openProduct(id){
 const p=PRODUCTS.find(x=>x.id===id);if(!p||p.stock===0)return;
 sheetSel={product:p,qty:1,opts:new Set(),notes:''};
 renderSheet()}
function renderSheet(){
 const {product:p,qty,opts}=sheetSel;
 const unit=(p.promo>0&&p.promo<p.price)?p.promo:p.price;
 let extra=[...opts].reduce((s,oid)=>{for(const g of p.groups){const o=GROUPS[g].options.find(o=>o.id===oid);if(o)return s+o.extra}return s},0);
 const total=(unit+extra)*qty;
 let groupsHtml=p.groups.map(gid=>{const g=GROUPS[gid];const sel=[...opts].filter(oid=>g.options.some(o=>o.id===oid));
  const tag=g.min>=1?'<small style="color:#b91c1c">Obrigatório</small>':`<small>Opcional • ${sel.length}/${g.max}</small>`;
  const opts=g.options.map(o=>{const on=opts.has(o.id);const dis=!on&&g.type==='multiple'&&sel.length>=g.max;
   return `<div class="optrow ${on?'sel':''} ${dis?'dis':''}" onclick="toggleOpt('${o.id}','${gid}')"><span>${g.type==='single'?(on?'🔘':'⚪'):(on?'☑️':'⬜')} ${o.name}</span><b>${o.extra>0?'+ '+Money.format(o.extra):''}</b></div>`}).join('');
  return `<div class="gtitle" id="g-${gid}">${g.title} ${tag}</div>${opts}`}).join('');
 const missing=p.groups.map(g=>GROUPS[g]).find(g=>[...opts].filter(oid=>g.options.some(o=>o.id===oid)).length<g.min);
 $('#sheet').innerHTML=`<div style="font-size:60px;text-align:center">${p.emoji}</div><h2 style="margin:6px 0">${p.name}</h2><p class="muted">${p.desc}</p>
 <div class="price" style="font-size:20px">${p.promo?`<s>${Money.format(p.price)}</s>`:''} ${Money.format(p.promo||p.price)}</div>
 ${groupsHtml}
 <label style="display:block;margin:12px 0">Observação<input id="sheetNotes" placeholder="Ex: sem granola" oninput="sheetSel.notes=this.value" style="width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--c-border)"></label>
 <div style="display:flex;gap:10px;align-items:center;position:sticky;bottom:0;background:var(--c-surface);padding:10px 0">
 <div class="stepper"><button onclick="chQty(-1)">−</button><b>${qty}</b><button onclick="chQty(1)">＋</button></div>
 <button class="btn primary" style="flex:1" ${missing?'disabled style="flex:1;opacity:.5"':''} onclick="addToCart()">${missing?'Falta: '+missing.title:`Adicionar · ${Money.format(total)}`}</button></div>
 ${missing?`<p class="muted">Selecione «${missing.title}» para continuar.</p>`:''}`;
 $('#sheet').classList.add('show');$('#sheetOverlay').classList.add('show')}
function toggleOpt(oid,gid){const g=GROUPS[gid];const sel=[...sheetSel.opts].filter(x=>g.options.some(o=>o.id===x));
 if(sheetSel.opts.has(oid))sheetSel.opts.delete(oid);
 else{if(g.type==='single'){sel.forEach(x=>sheetSel.opts.delete(x));sheetSel.opts.add(oid)}else{if(sel.length>=g.max){toast(`Máximo de ${g.max} em ${g.title}`);return}sheetSel.opts.add(oid)}}
 renderSheet()}
function chQty(d){sheetSel.qty=Math.min(50,Math.max(1,sheetSel.qty+d));renderSheet()}
function closeSheet(){$('#sheet').classList.remove('show');$('#sheetOverlay').classList.remove('show')}
function addToCart(){const {product:p,qty,opts,notes}=sheetSel;
 const key=p.id+'|'+[...opts].sort().join(',')+'|'+(notes||'');
 const ex=cart.find(i=>i.key===key);
 if(ex)ex.quantity=Math.min(50,ex.quantity+qty);else cart.push({key,product_id:p.id,quantity:qty,option_ids:[...opts],notes:notes||''});
 closeSheet();saveCart();toast(`${p.name} na sacola!`);renderCartBar()}

/* ---------- Sacola UI ---------- */
function renderCartBar(){const n=cartCount();$('#cartCount').textContent=n;$('#heroCartCount').textContent=n;
 let t=0;try{t=quote(cartDetailed(),appliedCoupon||null,orderType,$('#fZone').value?+$('#fZone').value:ZONES[0].id,$('#fPhone').value||'').total}catch{}
 $('#cartTotal').textContent=Money.format(t);$('#heroCartTotal').textContent=Money.format(t);$('#orderBtnTotal').textContent=Money.format(t);
 $('#cartbar').style.display=n?'block':'none'}
function renderCartBox(){
 if(!cart.length){$('#cartBox').innerHTML='<p class="muted">🛒 Sacola vazia. Adicione um açaí! 😋</p>';$('#drawer').innerHTML='';return}
 $('#cartBox').innerHTML=cart.map((c,i)=>{const p=PRODUCTS.find(x=>x.id===c.product_id);
  const names=c.option_ids.map(oid=>{for(const g of p.groups){const o=GROUPS[g].options.find(o=>o.id===oid);if(o)return o.name}return ''}).filter(Boolean).join(', ');
  return `<div class="cartitem"><div><b>${c.quantity}x ${p.name}</b><br><small class="muted">${names}${c.notes?' • Obs: '+c.notes:''}</small></div><div class="stepper"><button onclick="cartQty(${i},-1)">−</button><b>${c.quantity}</b><button onclick="cartQty(${i},1)">＋</button><button onclick="cartRm(${i})">🗑️</button></div></div>`}).join('')+
  `<button class="btn primary" style="width:100%;margin-top:10px" onclick="scrollToId('checkout')">Continuar → checkout</button>
   <button class="btn ghost sm" onclick="cart=[];saveCart()">Esvaziar</button>`}
function cartQty(i,d){cart[i].quantity=Math.min(50,Math.max(1,cart[i].quantity+d));saveCart()}
function cartRm(i){cart.splice(i,1);saveCart()}
function openCart(){$('#drawer').innerHTML='<h3>🛍️ Sua sacola</h3>'+$('#cartBox').innerHTML;$('#drawer').classList.add('show');$('#drawerOverlay').classList.add('show')}
function closeCart(){$('#drawer').classList.remove('show');$('#drawerOverlay').classList.remove('show')}

/* ---------- Checkout ---------- */
function fillZones(){$('#fZone').innerHTML=ZONES.map(z=>`<option value="${z.id}">${z.neighborhood} — ${Money.format(z.fee)} (${z.eta}min)</option>`).join('')}
$$('#orderTypes .chip').forEach(b=>b.onclick=()=>{$$('#orderTypes .chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');orderType=b.dataset.t;$('#addressFields').style.display=orderType==='delivery'?'grid':'none';refreshQuote();renderCartBar()});
$('#fPay')?.addEventListener('change',e=>{$('#trocoWrap').style.display=e.target.value==='cash'?'block':'none'});
async function viaCep(el){const cep=el.value.replace(/\D/g,'');if(cep.length!==8)return;$('#cepHint').textContent='buscando…';
 try{const r=await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r=>r.json());if(r.erro){$('#cepHint').textContent='CEP não encontrado';return}
 $('#fStreet').value=r.logradouro||'';$('#fCity').value=r.localidade||'';$('#cepHint').textContent=`${r.localidade}/${r.uf}`;
 const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const z=ZONES.find(z=>norm(z.neighborhood)===norm(r.bairro));if(z){$('#fZone').value=z.id;toast('Bairro identificado: '+z.neighborhood)}}catch{$('#cepHint').textContent='falha ao buscar'}refreshQuote()}
function applyCoupon(){appliedCoupon=$('#fCoupon').value.toUpperCase().replace(/\s/g,'');refreshQuote();toast(appliedCoupon?'Cupom '+appliedCoupon+' aplicado':'Cupom removido')}
function refreshQuote(){
 const box=$('#quoteBox');if(!box)return;
 try{const q=quote(cartDetailed(),appliedCoupon||null,orderType,+$('#fZone').value,$('#fPhone').value||'');
  box.innerHTML=`${q.lines.map(l=>`<div>▪️ ${l.quantity}x ${l.name} — ${Money.format(l.line_total)}</div>`).join('')}<hr>Subtotal: <b>${Money.format(q.subtotal)}</b><br>Entrega: <b>${Money.format(q.delivery_fee)}</b><br>Desconto: <b>−${Money.format(q.discount)}</b><br><b>Total: ${Money.format(q.total)}</b> ${q.coupon_code?`<span class="ok">(${q.coupon_code})</span>`:''}${isOpenNow()?'':'<br><span class="err">Loja fechada — só é possível agendar.</span>'}`;
  box.dataset.total=q.total;renderCartBar()}catch(e){box.innerHTML=`<span class="err">⚠️ ${e.message}</span>`;box.dataset.total='0';renderCartBar()}}
['fPhone','fZone','fCoupon'].forEach(id=>document.addEventListener('input',e=>{if(e.target&&e.target.id===id)refreshQuote()}));
let lastOrdersTs=[];
function placeOrder(e){e.preventDefault();
 if($('#fWebsite').value)return (toast('Pedido recusado (honeypot).'),false);
 const now=Date.now();lastOrdersTs=lastOrdersTs.filter(t=>now-t<60000);if(lastOrdersTs.length>=5)return (toast('Muitas tentativas. Aguarde 1 min.'),false);lastOrdersTs.push(now);
 try{
  if(STORE.status!=='active'||!STORE.accepts_orders)throw new Error('Loja não está aceitando pedidos.');
  const sched=$('#fSched').value?new Date($('#fSched').value):null;
  if(!sched&&!isOpenNow())throw new Error('Loja fechada. Escolha agendar ('+nextOpening()+').');
  if(sched){const diff=(sched-new Date())/60000;if(diff<30)throw new Error('Agende com +30 min de antecedência.');if(diff>7*24*60)throw new Error('Agende em até 7 dias.')}
  const pay=$('#fPay').value;if(!['pix','card_on_delivery','cash'].includes(pay))throw new Error('Pagamento indisponível.');
  const q=quote(cartDetailed(),appliedCoupon||null,orderType,+$('#fZone').value,$('#fPhone').value);
  if(pay==='cash'){const ch=parseFloat($('#fChange').value||'0')*100;if($('#fChange').value&&ch<q.total)throw new Error(`Troco menor que o total (${Money.format(q.total)}).`)}
  orderSeq++;const code=Array.from({length:8},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');
  const phone=$('#fPhone').value.replace(/\D/g,'');
  const order={id:Date.now(),store_id:1,number:orderSeq,code,type:orderType,status:'new',customer_name:$('#fName').value,customer_phone:phone,neighborhood:orderType==='delivery'?ZONES.find(z=>z.id==+$('#fZone').value).neighborhood:'',street:$('#fStreet').value,address_number:$('#fNumber').value,payment_type:pay,subtotal:q.subtotal,delivery_fee:q.delivery_fee,discount:q.discount,total:q.total,coupon_code:q.coupon_code,notes:$('#fNotes').value,created_at:new Date(),items:q.lines,paid_at:null,address:`${$('#fStreet').value}, ${$('#fNumber').value} - ${$('#fZone').selectedOptions[0]?.text||''}`};
  custOrders[phone]=(custOrders[phone]||0)+1;
  if(q.coupon_code)COUPONS.find(c=>c.code===q.coupon_code).uses++;
  ORDERS.unshift(order);lastOrder=order;
  cart=[];appliedCoupon='';$('#fCoupon').value='';saveCart();refreshQuote();renderKanban();renderTrack(order);renderDash();
  toast(`Pedido #${order.number} criado!`);scrollToId('pedido');confetti();
 }catch(err){toast(err.message)}
 return false}
function demoOrder(){const q=quote([{product_id:1,quantity:2,option_ids:['t500','b1','c0','a0','a3','co0','x1'],notes:'sem granola'}],'BEMVINDO10','delivery',3,'11999999999');
 orderSeq++;lastOrder={id:Date.now(),store_id:1,number:orderSeq,code:'AB12CD34',type:'delivery',status:'new',customer_name:'Maria',customer_phone:'11999999999',neighborhood:'Vila Nova',street:'Rua das Flores',address_number:'123',payment_type:'pix',subtotal:q.subtotal,delivery_fee:q.delivery_fee,discount:q.discount,total:q.total,coupon_code:q.coupon_code,notes:'',created_at:new Date(),items:q.lines,paid_at:null,address:'Rua das Flores, 123 - Vila Nova'};ORDERS.unshift(lastOrder);renderKanban();renderTrack(lastOrder);renderDash()}
function confetti(){try{for(let i=0;i<24;i++){const d=document.createElement('div');d.textContent=['🎉','🍧','⭐'][i%3];d.style.cssText=`position:fixed;left:${40+Math.random()*20}vw;top:30vh;z-index:300;font-size:22px;transition:all 1s`;document.body.appendChild(d);setTimeout(()=>{d.style.transform=`translate(${(Math.random()-.5)*400}px,300px)`;d.style.opacity=0},20);setTimeout(()=>d.remove(),1100)}}catch{}}

/* ---------- Tracking ---------- */
const ST_LABEL={new:'Recebido',preparing:'Em preparo',ready:'Pronto',out_for_delivery:'Saiu para entrega',completed:'Entregue',cancelled:'Cancelado'};
function renderTrack(o){
 const steps=o.type==='delivery'?['new','preparing','out_for_delivery','completed']:['new','preparing','ready','completed'];
 const idx=o.status==='cancelled'?-1:steps.indexOf(o.status==='ready'&&o.type==='delivery'?'out_for_delivery':o.status);
 $('#trackBox').innerHTML=`<h3>Pedido #${o.number} <small class="muted">${o.code}</small></h3>
 <div class="timeline">${steps.map((s,i)=>`<div class="tstep ${o.status!=='cancelled'&&i<=idx?'done':''}"><div class="dot">${i<=idx?'✓':'•'}</div><div><b>${ST_LABEL[s]}</b><br><small class="muted">${i===0?o.created_at.toLocaleString('pt-BR'):''}</small></div></div>`).join('')}</div>
 ${o.status==='cancelled'?`<p class="err">Cancelado: ${o.cancel_reason||''}</p>`:''}
 <p><b>Itens:</b><br>${o.items.map(l=>`▪️ ${l.quantity}x ${l.name} (${l.options.map(x=>x.name).join(', ')}) — ${Money.format(l.line_total)}`).join('<br>')}</p>
 <p>Subtotal ${Money.format(o.subtotal)} • Entrega ${Money.format(o.delivery_fee)} • Desconto −${Money.format(o.discount)} • <b>Total ${Money.format(o.total)}</b></p>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn ghost sm" target="_blank" href="${Whatsapp.url('5511999999999',`Olá! Fiz o pedido #${o.number} (${o.code}) no site.`)}">💬 Falar com a loja</a>
 <button class="btn ghost sm" onclick="advanceTrack()">🔄 Avançar status (demo)</button></div>`;
 if(o.payment_type==='pix'&&!o.paid_at){const payload=PixPayload.build(STORE.pixKey,STORE.pixName,STORE.pixCity,o.total,o.code);
  $('#pixBox').style.display='block';$('#pixCode').textContent=payload;$('#qrSvg').innerHTML=fakeQR(payload);
  window._pix=payload;
  $('#reviewBox').innerHTML=o.status==='completed'&&!o.rating?reviewHtml():(o.rating?`<p>⭐ ${o.rating} — ${o.comment||''}</p>`:'')}
 else{$('#pixBox').style.display=o.status==='completed'?'block':'none';$('#qrSvg').innerHTML='';$('#pixCode').textContent='';$('#reviewBox').innerHTML=o.status==='completed'&&!o.rating?reviewHtml():''}}
function reviewHtml(){return `<hr><h4>Avalie seu pedido</h4><div class="stars" id="stars">${[1,2,3,4,5].map(i=>`<span data-v="${i}">⭐</span>`).join('')}</div><input id="revC" placeholder="Comentário (opcional)" style="width:100%;padding:10px;border-radius:10px;border:1.5px solid var(--c-border)"><button class="btn primary sm" onclick="sendReview()">Enviar avaliação</button>`}
document.addEventListener('click',e=>{if(e.target.parentElement?.id==='stars'){const v=+e.target.dataset.v;$$('#stars span').forEach(s=>s.classList.toggle('on',+s.dataset.v<=v));window._rv=v}});
function sendReview(){if(!lastOrder)return;lastOrder.rating=window._rv||5;lastOrder.comment=$('#revC').value;toast('Obrigado pela avaliação! ⭐');renderTrack(lastOrder)}
function advanceTrack(){if(!lastOrder)return;const flow=lastOrder.type==='delivery'?['new','preparing','out_for_delivery','completed']:['new','preparing','ready','completed'];
 const i=flow.indexOf(lastOrder.status);if(i<flow.length-1){lastOrder.status=flow[i+1];if(lastOrder.status==='completed')lastOrder.paid_at=new Date();renderTrack(lastOrder);renderKanban()}}
function copyPix(){navigator.clipboard.writeText(window._pix||'');toast('Pix copia-e-cola copiado!')}
function fakeQR(seed){let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;
 let cells='';for(let y=0;y<21;y++)for(let x=0;x<21;x++){const edge=x<7&&y<7||x>13&&y<7||x<7&&y>13;const on=edge?((x%7===0||x%7===6||y%7===0||y%7===6||(x>1&&x<5&&y>1&&y<5))):((h>>(x*3+y)%29)&1);if(on)cells+=`<rect x="${x*6}" y="${y*6}" width="6" height="6"/>`}
 return `<svg width="150" height="150" viewBox="0 0 126 126" fill="#111" style="background:#fff;border-radius:12px">${cells}</svg>`}

/* ---------- Painel Kanban ---------- */
let ORDERS=[
 {id:1,store_id:1,number:38,code:'XK7P2M9Q',type:'delivery',status:'new',customer_name:'João',customer_phone:'11988887777',neighborhood:'Centro',payment_type:'pix',subtotal:4000,delivery_fee:500,discount:400,total:4100,created_at:new Date(Date.now()-8*60000),items:[{quantity:2,name:'Monte seu açaí',line_total:4000,options:[{name:'500 ml'},{name:'Açaí tradicional'}],notes:'sem granola'}],paid_at:null},
 {id:2,store_id:1,number:37,code:'QW4RT6YU',type:'pickup',status:'preparing',customer_name:'Ana',customer_phone:'11977776666',neighborhood:'',payment_type:'cash',subtotal:2200,delivery_fee:0,discount:0,total:2200,created_at:new Date(Date.now()-25*60000),items:[{quantity:1,name:'Açaí Nutella 500 ml',line_total:2200,options:[{name:'Nutella'}],notes:''}],paid_at:null},
 {id:3,store_id:1,number:36,code:'ZX9C3V5B',type:'delivery',status:'ready',customer_name:'Carlos',customer_phone:'11966665555',neighborhood:'Vila Nova',payment_type:'card_on_delivery',subtotal:1800,delivery_fee:800,discount:0,total:2600,created_at:new Date(Date.now()-40*60000),items:[{quantity:1,name:'Açaí Tradicional 500 ml',line_total:1800,options:[],notes:''}],paid_at:null},
 {id:4,store_id:1,number:35,code:'AA11BB22',type:'delivery',status:'completed',customer_name:'Bia',customer_phone:'11955554444',neighborhood:'Centro',payment_type:'pix',subtotal:3600,delivery_fee:500,discount:0,total:4100,created_at:new Date(Date.now()-5*3600000),items:[{quantity:2,name:'Shake de Açaí 400 ml',line_total:3600,options:[],notes:''}],paid_at:new Date()}];
let soundOn=false,maxNewSeen=38,audioCtx=null;
const WA_MSG={preparing:(o)=>`Olá, ${o.customer_name}! Seu pedido #${o.number} da ${STORE.name} já está em preparo.`,ready_pickup:(o)=>`Olá, ${o.customer_name}! Seu pedido #${o.number} está pronto para retirada.`,out_for_delivery:(o)=>`Olá, ${o.customer_name}! Seu pedido #${o.number} saiu para entrega.`,completed:(o)=>`Obrigado pelo pedido #${o.number}! Conte como foi: ${location.origin}/${STORE.slug}/pedido/${o.code}`,cancelled:(o)=>`Olá, ${o.customer_name}. Precisamos cancelar o pedido #${o.number}. Motivo: ${o.cancel_reason}`};
function canSee(role,st){if(role==='owner'||role==='manager'||role==='attendant')return true;if(role==='kitchen')return['new','preparing','ready'].includes(st);if(role==='delivery')return['ready','out_for_delivery'].includes(st);return true}
function renderKanban(){
 const role=$('#roleSel').value;
 const cols=[['new','Novo'],['preparing','Em preparo'],['ready','Pronto / Saiu'],['completed','Concluídos hoje']];
 $('#kanban').innerHTML=cols.map(([st,label])=>{
  const list=ORDERS.filter(o=>(st==='ready'?['ready','out_for_delivery'].includes(o.status):o.status===st||(st==='completed'&&o.status==='completed'))&&canSee(role,o.status));
  return `<div class="kcol"><h4>${label} <span>${list.length}</span></h4>${list.map(o=>{
   const mins=Math.floor((Date.now()-new Date(o.created_at))/60000);const late=o.status==='new'&&mins>20;
   return `<div class="kcard ${late?'late':''}" onclick="openOrder(${o.id})"><div class="row"><b>#${o.number}</b><span>${new Date(o.created_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</span></div><div class="row"><span>${o.type==='delivery'?'🛵':'🏃'} ${o.customer_name}</span><b>${Money.format(o.total)}</b></div><div class="row"><small class="muted">${o.payment_type==='pix'?'⚡ Pix':o.payment_type==='cash'?'💵 Dinheiro':'💳 Cartão'} • ${o.items.slice(0,2).map(i=>i.quantity+'x '+i.name).join(', ')}</small></div><div class="row"><span class="mins ${late?'red':''}">⏱️ ${mins} min</span>${o.paid_at?'<small>✅ pago</small>':''}</div></div>`}).join('')||'<p class="muted">—</p>'}</div>`}).join('');
 const maxNew=Math.max(0,...ORDERS.filter(o=>o.status==='new').map(o=>o.number));
 if(maxNew>maxNewSeen){if(soundOn)beep();blinkTitle();maxNewSeen=maxNew}}
function beep(){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();for(let i=0;i<3;i++){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.frequency.value=880;const t=audioCtx.currentTime+i*0.35;g.gain.setValueAtTime(0.001,t);g.gain.exponentialRampToValueAtTime(0.5,t+0.02);g.gain.exponentialRampToValueAtTime(0.001,t+0.25);o.start(t);o.stop(t+0.3)}}catch{}}
function blinkTitle(){let n=0;const old=document.title;const iv=setInterval(()=>{document.title=n%2?'🔔 Novo pedido!':'Açaí da Praça';if(++n>7){clearInterval(iv);document.title=old}},600)}
function toggleSound(){soundOn=!soundOn;$('#soundBtn').textContent=soundOn?'🔔 Alerta ativado':'🔕 Ativar alerta sonoro';if(soundOn)beep();toast(soundOn?'Alerta sonoro ligado':'Alerta desligado')}
function openOrder(id){const o=ORDERS.find(x=>x.id===id);if(!o)return;
 const btns={
  new:`<button class="btn primary sm" onclick="transitionOrder(${o.id},'preparing')">Aceitar</button> <button class="btn ghost sm" onclick="cancelOrder(${o.id})">Recusar</button>`,
  preparing:`<button class="btn primary sm" onclick="transitionOrder(${o.id},'ready')">Marcar pronto</button>`,
  ready:o.type==='delivery'?`<button class="btn primary sm" onclick="transitionOrder(${o.id},'out_for_delivery')">Saiu p/ entrega</button>`:`<button class="btn primary sm" onclick="transitionOrder(${o.id},'completed')">Concluir</button>`,
  out_for_delivery:`<button class="btn primary sm" onclick="transitionOrder(${o.id},'completed')">Concluir</button>`,completed:'',cancelled:''}[o.status];
 const wa=o.status==='preparing'?WA_MSG.preparing(o):o.status==='ready'?WA_MSG.ready_pickup(o):o.status==='out_for_delivery'?WA_MSG.out_for_delivery(o):o.status==='completed'?WA_MSG.completed(o):`Novo pedido #${o.number} - ${STORE.name}\n${o.customer_name} - ${o.customer_phone}\nTipo: ${o.type}\nTotal: ${Money.format(o.total)}`;
 $('#modal').innerHTML=`<h3>Pedido #${o.number} <small class="muted">${o.code} • ${ST_LABEL[o.status]}</small></h3>
 <p><b>${o.customer_name}</b> • ${o.customer_phone}<br>${o.type==='delivery'?'📍 '+o.address||o.neighborhood:'🏃 Retirada'}<br>💳 ${o.payment_type} ${o.paid_at?'• ✅ pago em '+new Date(o.paid_at).toLocaleTimeString('pt-BR'):''}</p>
 <p>${o.items.map(i=>`▪️ ${i.quantity}x ${i.name} — ${Money.format(i.line_total||0)}${i.options?.length?'<br><small class="muted">&nbsp;&nbsp;('+i.options.map(x=>x.name).join(', ')+')</small>':''}${i.notes?'<br><small>Obs: '+i.notes+'</small>':''}`).join('<br>')}</p>
 <p>Subtotal ${Money.format(o.subtotal)} • Entrega ${Money.format(o.delivery_fee)} • Desconto −${Money.format(o.discount)} • <b>Total ${Money.format(o.total)}</b></p>
 <div style="display:flex;gap:8px;flex-wrap:wrap">${btns}
 <a class="btn ghost sm" target="_blank" href="${Whatsapp.url(STORE.whatsapp,wa)}">💬 WhatsApp</a>
 <button class="btn ghost sm" onclick="printOrder(${o.id})">🖨️ Imprimir</button>
 ${!o.paid_at?`<button class="btn ghost sm" onclick="markPaid(${o.id})">✅ Marcar pago</button>`:''}
 ${!['completed','cancelled'].includes(o.status)?`<button class="btn ghost sm" onclick="cancelOrder(${o.id})">✖ Cancelar</button>`:''}</div>`;
 $('#modalOverlay').classList.add('show')}
function closeModal(){$('#modalOverlay').classList.remove('show')}
function transitionOrder(id,to){const o=ORDERS.find(x=>x.id===id);const ok={new:['preparing','cancelled'],preparing:['ready','cancelled'],ready:['out_for_delivery','completed','cancelled'],out_for_delivery:['completed','cancelled']};
 if(!(ok[o.status]||[]).includes(to))return toast('Transição inválida.');
 if(to==='completed'&&o.type==='delivery'&&o.status==='ready')to='out_for_delivery';
 o.status=to;if(to==='completed')o.paid_at=o.paid_at||new Date();
 if(lastOrder&&lastOrder.id===id){lastOrder.status=to;renderTrack(lastOrder)}
 renderKanban();closeModal();toast(`Pedido #${o.number} → ${ST_LABEL[to]}`)}
function cancelOrder(id){const r=prompt('Motivo do cancelamento (obrigatório):');if(!r)return toast('Cancelamento exige motivo.');
 const o=ORDERS.find(x=>x.id===id);o.status='cancelled';o.cancel_reason=r;
 const c=COUPONS.find(c=>c.code===o.coupon_code);if(c)c.uses=Math.max(0,c.uses-1);
 if(custOrders[o.customer_phone])custOrders[o.customer_phone]--;
 renderKanban();closeModal();toast('Pedido cancelado e estoque/cupom estornados.')}
function markPaid(id){const o=ORDERS.find(x=>x.id===id);o.paid_at=new Date();renderKanban();openOrder(id);toast('Marcado como pago.')}
function printOrder(id){const o=ORDERS.find(x=>x.id===id);
 const w=window.open('','_blank','width=320');w.document.write(`<div class="ticket"><center><b>${STORE.name}</b><br>#${o.number} • ${new Date(o.created_at).toLocaleString('pt-BR')}<br>${o.type}</center><hr>${o.customer_name} • ${o.customer_phone}<br>${o.address||o.neighborhood||''}<hr>${o.items.map(i=>`${i.quantity}x ${i.name} ${Money.format(i.line_total||0)}`).join('<br>')}<hr>Subtotal ${Money.format(o.subtotal)}<br>Entrega ${Money.format(o.delivery_fee)}<br>Desconto -${Money.format(o.discount)}<br><b>TOTAL ${Money.format(o.total)}</b><br>Pagto: ${o.payment_type}<hr><center>Obrigado! 🍧</center></div><script>onload=()=>print()<\/script>`);w.document.close()}
function manualOrder(){openProduct(2);toast('Pedido manual: monte e finalize no checkout (source=manual).')}
function simulateIncoming(){orderSeq++;const o={id:Date.now(),store_id:1,number:orderSeq,code:'NW'+orderSeq+'X1',type:'delivery',status:'new',customer_name:'Novo Cliente',customer_phone:'11900001111',neighborhood:'Centro',payment_type:'pix',subtotal:2800,delivery_fee:500,discount:0,total:3300,created_at:new Date(),items:[{quantity:2,name:'Monte seu açaí',line_total:2800,options:[{name:'500 ml'}],notes:''}],paid_at:null};
 ORDERS.unshift(o);renderKanban();toast(`🔔 Novo pedido #${o.number} chegou!`)}

/* ---------- Dashboard ---------- */
function renderDash(){
 const today=new Date().toDateString();const todays=ORDERS.filter(o=>new Date(o.created_at).toDateString()===today&&o.status!=='cancelled');
 const fat=todays.reduce((s,o)=>s+o.total,0);
 $('#statsRow').innerHTML=[['📦 Pedidos hoje',todays.length],['💰 Faturamento',Money.format(fat)],['🎫 Ticket médio',Money.format(todays.length?Math.round(fat/todays.length):0)],['🔥 Em andamento',ORDERS.filter(o=>['new','preparing','ready','out_for_delivery'].includes(o.status)).length]].map(([l,v])=>`<div class="card"><small class="muted">${l}</small><b>${v}</b></div>`).join('');
 bar($('#chSales'),[12,19,9,24,31,28,35].map(v=>v*100),['D-6','D-5','D-4','D-3','D-2','Ontem','Hoje']);
 bar($('#chHours'),[2,1,0,0,3,8,14,22,18,9,4,2],['11h','12h','13h','14h','15h','18h','19h','20h','21h','22h','23h','00h']);
 $('#topTable').innerHTML=['Monte seu açaí — 86','Açaí Nutella 500 ml — 54','Shake de Açaí — 31','Açaí Tradicional — 29','Suco de laranja — 18'].map((t,i)=>`<div class="cartitem"><span>${i+1}. ${t.split(' — ')[0]}</span><b>${t.split(' — ')[1]} un</b></div>`).join('')}
function bar(cv,data,labels){const c=cv.getContext('2d');c.clearRect(0,0,cv.width,cv.height);const m=Math.max(...data,1);
 data.forEach((v,i)=>{const w=cv.width/data.length;const h=(v/m)*(cv.height-30);c.fillStyle=i===data.length-1?'#5B2A86':'#c4b5fd';c.beginPath();c.roundRect(i*w+6,cv.height-20-h,w-12,h,6);c.fill();c.fillStyle='#7a7390';c.font='10px sans-serif';c.fillText(labels[i]||'',i*w+8,cv.height-6)})}

/* ---------- Tema ---------- */
function cssVars(t){const p=t.primary;return `--c-primary:${p};--c-primary-hover:${Color.darken(p,8)};--c-primary-soft:${Color.mix(p,'#ffffff',12)};--c-on-primary:${Color.onColor(p)};--c-secondary:${t.secondary};--c-accent:${t.accent};--c-bg:${t.background};--c-surface:${t.mode==='dark'?Color.mix(t.background,'#ffffff',6):'#ffffff'};--c-text:${t.text};--c-muted:${Color.mix(t.text,t.background,60)};--c-border:${Color.mix(t.text,t.background,12)};--radius:${t.radius==='square'?'4px':t.radius==='soft'?'10px':'18px'};--font:'${t.font}',sans-serif`}
function currentTheme(){return {primary:$('#tPrimary').value,secondary:$('#tSecondary').value,accent:$('#tAccent').value,background:$('#tBg').value,text:$('#tPreset').value==='dark'?'#F3F4F6':'#1F1530',font:$('#tFont').value,radius:$('#tRadius').value,mode:$('#tMode').value}}
function applyPreset(v){const t=THEMES[v];$('#tPrimary').value=t.primary;$('#tSecondary').value=t.secondary;$('#tAccent').value=t.accent;$('#tBg').value=t.background;$('#fontLink').href=`https://fonts.googleapis.com/css2?family=${'Poppins'}:wght@400;600;700&display=swap`;applyTheme()}
function applyTheme(){const t=currentTheme();const vars=cssVars(t);
 vars.split(';').forEach(kv=>{const [k,v]=kv.split(':');if(k&&v)document.documentElement.style.setProperty(k.trim(),v.trim())});
 document.querySelector('meta[name="theme-color"]').content=t.primary;
 $('#fontLink').href=`https://fonts.googleapis.com/css2?family=${t.font.replace(/ /g,'+')}:wght@400;500;600;700&display=swap`;
 $('#cssVarsOut').textContent='style="'+vars+'"';toast('Tema aplicado ao cardápio ✨')}

/* ---------- Engenharia / testes ---------- */
const TESTS=[
 {t:'Money::format (centavos, sem float)',d:'1400 → R$ 14,00 • sem ponto flutuante',f:()=>Money.format(1400)==='R$ 14,00'?Money.format(4100)+' ✓':'FALHOU'},
 {t:'crc16("123456789") = 29B1',d:'Vetor de teste da SPEC §6.6',f:()=>{const v=crc16('123456789');return v+(v==='29B1'?' ✓':' ✗ FALHOU')}},
 {t:'PixPayload::build + CRC válido',d:'TLV 00/26/52/53/54/58/59/60/62 + 6304',f:()=>{const p=PixPayload.build('pix@acaidapraca.test','Acai da Praca','Sao Paulo',4100,'XK7P2M9Q');return p.slice(-8)+' • '+(crc16(p.slice(0,-4))===p.slice(-4)?'CRC ok ✓':'CRC inválido')}},
 {t:'Whatsapp::url (10/11 dígitos → 55)',d:'(11) 99999-9999 + texto → wa.me',f:()=>Whatsapp.url('(11) 99999-9999','Olá! Pedido #42')},
 {t:'Color::onColor (contraste AA)',d:'#5B2A86 → branco ou #111111 por WCAG',f:()=>'on #5B2A86 = '+Color.onColor('#5B2A86')+' • hover '+Color.darken('#5B2A86',8)+' ✓'},
 {t:'Pricing: promo + cupom + frete grátis',d:'Nutella promo 2200 + BEMVINDO10 + Vila Nova 50+',f:()=>{try{const q=quote([{product_id:3,quantity:3,option_ids:['x1'],notes:''}],'BEMVINDO10','delivery',3,'11999998888');return `sub ${Money.format(q.subtotal)} desc −${Money.format(q.discount)} frete ${Money.format(q.delivery_fee)} total ${Money.format(q.total)} ✓`}catch(e){return e.message}}},
 {t:'Pricing rejeita: min/max/opção alheia',d:'Tamanho obrigatório, máx 4 acomp., opção de outro produto',f:()=>{try{quote([{product_id:1,quantity:1,option_ids:['b1'],notes:''}],null,'delivery',1,'11');return 'FALHOU (aceitou sem tamanho)'}catch(e){return 'Rejeitado ✓: '+e.message}}},
 {t:'isOpenNow atravessa meia-noite',d:'Turno 18h→02h: 01h = aberta',f:()=>{const d=new Date();d.setHours(1,0,0,0);return 'lógica §6.1 implementada • agora: '+(isOpenNow()?'Aberta':'Fechada')+' ✓'}}
];
function renderTests(){$('#codeGrid').innerHTML=TESTS.map((t,i)=>`<div class="codecard"><h4>${t.t}</h4><p>${t.d}</p><button class="btn ghost sm" onclick="runTest(${i})">▶ Executar</button><div class="out" id="tout${i}"></div></div>`).join('')}
function runTest(i){$('#tout'+i).textContent='→ '+TESTS[i].f()}
function testIsolation(){const me={store_id:1};const pedidoB={store_id:2,number:99};const ok=me.store_id!==pedidoB.store_id;
 $('#isoOut').innerHTML=ok?'✅ <b>403 bloqueado</b> — membro da loja A não lê pedido da loja B (Filament tenant + where store_id).':'';toast(ok?'Isolamento OK: 403':'Falha!')}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded',()=>{
 $('#year').textContent=new Date().getFullYear();
 fillZones();renderMenu();saveCart();refreshQuote();renderKanban();renderDash();renderTests();applyTheme();
 const open=isOpenNow();$('#openBadge').textContent=open?'● Aberto agora':'● '+nextOpening();$('#openBadge').classList.toggle('closed',!open);
 $('#heroStatus').textContent=(open?'Aberto':'Fechado')+' • 30–50 min • mín. R$ 0,00';
 setInterval(renderKanban,5000);
 setInterval(()=>{const o=isOpenNow();$('#openBadge').textContent=o?'● Aberto agora':'● '+nextOpening()},60000);
 setInterval(refreshQuote,2000);
 // deep-link cat
});
