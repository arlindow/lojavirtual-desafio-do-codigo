// ============ DADOS ============
const servicos = [
  { id:'s1', icon:'💻', nome:'Formatação e Instalação de Windows', desc:'Formatação completa com instalação do Windows 10/11, drivers e programas essenciais. Backup dos arquivos incluído.', preco:80, tipo:'servico', categoria:'computadores' },
  { id:'s2', icon:'🔩', nome:'Manutenção Preventiva de PC', desc:'Limpeza interna completa, troca de pasta térmica, atualização de drivers e otimização geral do sistema.', preco:60, tipo:'servico', categoria:'computadores' },
  { id:'s3', icon:'🖥️', nome:'Reparo de Notebook', desc:'Diagnóstico e reparo completo de notebooks: tela, teclado, placa-mãe, bateria e muito mais.', preco:120, tipo:'servico', categoria:'notebooks' },
  { id:'s4', icon:'📱', nome:'Conserto de Celular', desc:'Troca de tela, bateria, conector de carga e reparos em geral para as principais marcas do mercado.', preco:100, tipo:'servico', categoria:'celulares' },
  { id:'s5', icon:'🌐', nome:'Instalação de Rede Wi-Fi', desc:'Configuração completa de redes domésticas e empresariais, roteadores, repetidores e access points.', preco:90, tipo:'servico', categoria:'redes' },
  { id:'s6', icon:'🔒', nome:'Remoção de Vírus e Malware', desc:'Remoção completa de vírus, spyware, ransomware e proteção avançada contra ameaças digitais.', preco:70, tipo:'servico', categoria:'computadores' },
  { id:'s7', icon:'💾', nome:'Recuperação de Dados', desc:'Recuperação de arquivos deletados, HD com defeito, pen drives e cartões de memória corrompidos.', preco:150, tipo:'servico', categoria:'dados' },
  { id:'s8', icon:'⚙️', nome:'Upgrade e Montagem de PC', desc:'Montagem de computadores personalizados e upgrade de componentes com auxílio técnico especializado.', preco:100, tipo:'servico', categoria:'computadores' },
  { id:'s9', icon:'📡', nome:'Configuração de CFTV', desc:'Instalação e configuração de câmeras de segurança IP, DVR/NVR e acesso remoto.', preco:200, tipo:'servico', categoria:'redes' },
  { id:'s10', icon:'🖨️', nome:'Manutenção de Impressora', desc:'Limpeza de cabeçotes, troca de cartuchos, reparo mecânico e configuração em rede.', preco:80, tipo:'servico', categoria:'impressoras' },
];

const produtos = [
  { id:'p1', icon:'🔧', nome:'SSD 240GB Kingston', desc:'SSD SATA III 2.5" para upgrade de velocidade. Compatível com notebooks e desktops.', preco:130, tipo:'produto', categoria:'componentes' },
  { id:'p2', icon:'💿', nome:'Memória RAM 8GB DDR4', desc:'Memória RAM DDR4 2666MHz para ampliar o desempenho do seu computador ou notebook.', preco:150, tipo:'produto', categoria:'componentes' },
  { id:'p3', icon:'🖱️', nome:'Mouse Gamer USB', desc:'Mouse com DPI ajustável, 6 botões programáveis, iluminação LED RGB e cabo trançado.', preco:75, tipo:'produto', categoria:'perifericos' },
  { id:'p4', icon:'⌨️', nome:'Teclado Multimídia USB', desc:'Teclado ABNT2 com teclas multimídia, resistente a respingos e conexão USB plug & play.', preco:65, tipo:'produto', categoria:'perifericos' },
  { id:'p5', icon:'🖥️', nome:'Monitor LED 21.5"', desc:'Monitor Full HD 1920x1080, painel IPS, 75Hz, entrada VGA/HDMI, ideal para home office.', preco:680, tipo:'produto', categoria:'notebooks' },
  { id:'p6', icon:'🔌', nome:'Cabo HDMI 2m', desc:'Cabo HDMI 2.0 suporte 4K@60Hz, ideal para TVs, monitores e projetores. Alta qualidade.', preco:25, tipo:'produto', categoria:'acessorios' },
  { id:'p7', icon:'💨', nome:'Pasta Térmica Profissional', desc:'Pasta térmica de alta condutividade para processadores e placas de vídeo. Rendimento 3g.', preco:20, tipo:'produto', categoria:'acessorios' },
  { id:'p8', icon:'🔋', nome:'Bateria Notebook Universal', desc:'Bateria recarregável compatível com diversas marcas. Alta durabilidade e ciclos de carga.', preco:180, tipo:'produto', categoria:'componentes' },
  { id:'p9', icon:'📦', nome:'Hub USB 4 Portas', desc:'Hub USB 3.0 com 4 saídas de alta velocidade. Plug & play, suporte para dispositivos variados.', preco:45, tipo:'produto', categoria:'acessorios' },
  { id:'p10', icon:'🖨️', nome:'Cartucho HP Colorido Original', desc:'Cartucho de tinta HP original colorido. Alta qualidade de impressão e durabilidade.', preco:55, tipo:'produto', categoria:'acessorios' },
  { id:'p11', icon:'💻', nome:'Notebook Recondicionado i5', desc:'Notebook Intel Core i5, 8GB RAM, SSD 240GB, tela 15.6", revisado e com garantia de 90 dias.', preco:1200, tipo:'produto', categoria:'notebooks' },
  { id:'p12', icon:'🖱️', nome:'Suporte Ergonômico p/ Notebook', desc:'Suporte ajustável em alumínio para notebook até 17". Melhora a postura e dissipa calor.', preco:85, tipo:'produto', categoria:'perifericos' },
];

// ============ CARRINHO ============
let carrinho = [];

function addToCart(item) {
  const existing = carrinho.find(c => c.id === item.id);
  if (existing) {
    existing.qty++;
  } else {
    carrinho.push({ ...item, qty: 1 });
  }
  updateCartUI();
  showToast(`✅ ${item.nome} adicionado!`);
}

function removeFromCart(id) {
  carrinho = carrinho.filter(c => c.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = carrinho.find(c => c.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else updateCartUI();
  }
}

function updateCartUI() {
  const total = carrinho.reduce((s, c) => s + c.preco * c.qty, 0);
  const count = carrinho.reduce((s, c) => s + c.qty, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2).replace('.',',')}`;

  const container = document.getElementById('cartItems');
  if (carrinho.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛒</span>
        <p style="font-family:'Orbitron',monospace;font-size:0.85rem;color:var(--cinza);">Carrinho vazio</p>
        <p style="font-size:0.85rem;margin-top:8px;color:rgba(138,180,212,0.5);">Adicione serviços ou produtos para fazer seu pedido</p>
      </div>`;
    return;
  }

  container.innerHTML = carrinho.map(item => `
    <div class="cart-item">
      <span class="cart-item-icon">${item.icon}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-type">${item.tipo === 'servico' ? '🔧 Serviço' : '📦 Produto'} • R$ ${item.preco.toFixed(2).replace('.',',')}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${item.id}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}',1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
        <span class="cart-item-price">R$ ${(item.preco*item.qty).toFixed(2).replace('.',',')}</span>
      </div>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
}

// ============ WHATSAPP ============
function enviarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    showToast('⚠️ Seu carrinho está vazio!');
    return;
  }

  const total = carrinho.reduce((s, c) => s + c.preco * c.qty, 0);
  
  let msg = `🖥️ *PEDIDO - DESAFIO DO CÓDIGO*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━\n\n`;

  const servs = carrinho.filter(c => c.tipo === 'servico');
  const prods = carrinho.filter(c => c.tipo === 'produto');

  if (servs.length > 0) {
    msg += `🔧 *SERVIÇOS SOLICITADOS:*\n`;
    servs.forEach(s => {
      msg += `• ${s.nome}\n`;
      msg += `  Qtd: ${s.qty} x R$ ${s.preco.toFixed(2).replace('.',',')} = R$ ${(s.preco*s.qty).toFixed(2).replace('.',',')}\n`;
    });
    msg += `\n`;
  }

  if (prods.length > 0) {
    msg += `📦 *PRODUTOS DESEJADOS:*\n`;
    prods.forEach(p => {
      msg += `• ${p.nome}\n`;
      msg += `  Qtd: ${p.qty} x R$ ${p.preco.toFixed(2).replace('.',',')} = R$ ${(p.preco*p.qty).toFixed(2).replace('.',',')}\n`;
    });
    msg += `\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *TOTAL: R$ ${total.toFixed(2).replace('.',',')}*\n\n`;
  msg += `Gostaria de confirmar este pedido. Quando posso ser atendido? 😊`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/5587981098703?text=${encoded}`, '_blank');
}

// ============ RENDER CARDS ============
function renderCard(item) {
  const isAdded = carrinho.some(c => c.id === item.id);
  const imgLabel = item.tipo === 'servico' ? 'Foto do Serviço' : 'Foto do Produto';
  const imgIcon = item.tipo === 'servico' ? '🔧' : '📷';
  return `
    <div class="card" id="card-${item.id}">
      <div class="card-image" id="imgbox-${item.id}">
        <input type="file" accept="image/*" onchange="handleImg(event,'${item.id}')" title="Clique para adicionar foto">
        <img id="img-${item.id}" alt="${item.nome}">
        <button class="img-remove" id="rmv-${item.id}" onclick="removeImg(event,'${item.id}')">✕</button>
        <div class="card-image-placeholder" id="ph-${item.id}">
          <span>${imgIcon}</span>
          <span>${imgLabel}</span>
        </div>
      </div>
      <span class="badge ${item.tipo === 'servico' ? 'badge-servico' : 'badge-produto'}">${item.tipo === 'servico' ? '⚙️ Serviço' : '📦 Produto'}</span>
      <div class="card-title">${item.nome}</div>
      <div class="card-desc">${item.desc}</div>
      <div class="card-price">R$ ${item.preco.toFixed(2).replace('.',',')} <span>${item.tipo === 'servico' ? '/ serviço' : '/ unid.'}</span></div>
      <button class="btn-add ${isAdded ? 'added' : ''}" onclick="addToCart(${JSON.stringify(item).replace(/"/g,'&quot;')});this.classList.add('added');this.textContent='✓ Adicionado'">
        ${isAdded ? '✓ Adicionado' : '+ Adicionar ao Carrinho'}
      </button>
    </div>`;
}

function handleImg(event, id) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById('img-' + id);
    img.src = e.target.result;
    img.classList.add('loaded');
    document.getElementById('ph-' + id).style.display = 'none';
    document.getElementById('rmv-' + id).classList.add('visible');
    // store in imgData map so re-renders keep it
    imgData[id] = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeImg(event, id) {
  event.stopPropagation();
  event.preventDefault();
  const img = document.getElementById('img-' + id);
  img.src = '';
  img.classList.remove('loaded');
  document.getElementById('ph-' + id).style.display = 'flex';
  document.getElementById('rmv-' + id).classList.remove('visible');
  delete imgData[id];
}

// Persist images across re-renders
const imgData = {};

function applyStoredImages() {
  Object.keys(imgData).forEach(id => {
    const img = document.getElementById('img-' + id);
    if (img) {
      img.src = imgData[id];
      img.classList.add('loaded');
      const ph = document.getElementById('ph-' + id);
      if (ph) ph.style.display = 'none';
      const rmv = document.getElementById('rmv-' + id);
      if (rmv) rmv.classList.add('visible');
    }
  });
}

// ============ FILTRO PRODUTOS ============
function filtrarProdutos(cat, btn) {
  if (btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }
  const lista = cat === 'todos' ? produtos : produtos.filter(p => p.categoria === cat);
  document.getElementById('produtosGrid').innerHTML = lista.map(renderCard).join('');
applyStoredImages();
}

// ============ TOAST ============
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ============ NAVEGAÇÃO ============
function showPage(page, linkEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ INIT ============
// Home: 4 serviços destaque
document.getElementById('homeServicos').innerHTML = servicos.slice(0, 4).map(renderCard).join('');
applyStoredImages();
// Página serviços
document.getElementById('servicosGrid').innerHTML = servicos.map(renderCard).join('');
applyStoredImages();
// Página produtos
document.getElementById('produtosGrid').innerHTML = produtos.map(renderCard).join('');

updateCartUI();