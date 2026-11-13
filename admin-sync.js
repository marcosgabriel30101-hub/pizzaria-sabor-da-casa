/* Sincroniza os dados públicos gerenciados no painel administrativo. */
(async function () {
  const pageCategory = ({'catalogo30.html':'30cm','catalogo35.html':'35cm','mini.html':'mini','bebidas.html':'bebidas','promocoes.html':'promocoes'})[location.pathname.split('/').pop()];
  try {
    const response = await fetch('/api/public/products', { headers: { 'Accept': 'application/json' } });
    if (!response.ok) return;
    const products = await response.json();
    const byId = new Map(products.map(product => [product.id, product]));
    const seen = new Set();
    document.querySelectorAll('[data-product-id]').forEach(card => {
      const product = byId.get(card.dataset.productId);
      if (!product || (pageCategory && product.category !== pageCategory)) { card.hidden = true; return; }
      seen.add(product.id);
      card.hidden = !product.active;
      const title = card.querySelector('.pizza-info h2');
      const description = card.querySelector('.pizza-info p');
      const price = card.querySelector('.pizza-info h3');
      const image = card.querySelector('img');
      if (title) title.textContent = product.name;
      if (description) description.textContent = product.description || '';
      if (price) price.textContent = Number(product.price).toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
      if (image && product.image) { image.src = product.image; image.alt = product.name; }
      const button = card.querySelector('.pizza-info button[onclick*="abrirAdicionais"]');
      if (button) button.setAttribute('onclick', `abrirAdicionais(${JSON.stringify(product.name + ' ' + product.category)},${Number(product.price)})`);
    });
    if (!pageCategory) return;
    const catalog = document.querySelector('.catalogo-pizzas');
    if (!catalog) return;
    products.filter(p => p.category === pageCategory && p.active && !seen.has(p.id)).forEach(product => {
      const card = document.createElement('article'); card.className = 'pizza-card'; card.dataset.productId = product.id;
      const img = document.createElement('img'); img.src = product.image || ''; img.alt = product.name;
      const info = document.createElement('div'); info.className = 'pizza-info';
      const title = document.createElement('h2'); title.textContent = product.name;
      const desc = document.createElement('p'); desc.textContent = product.description || '';
      const price = document.createElement('h3'); price.textContent = Number(product.price).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
      const button = document.createElement('button'); button.type = 'button'; button.textContent = 'Adicionar';
      button.addEventListener('click', () => window.abrirAdicionais(`${product.name} ${product.category}`, Number(product.price)));
      info.append(title,desc,price,button); card.append(img,info); catalog.append(card);
    });
  } catch (error) { console.warn('Catálogo usando os dados locais; API indisponível.', error); }
})();