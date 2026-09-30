const search = document.querySelector('#concept-search');
const cards = [...document.querySelectorAll('.concept-card')];
const emptyState = document.querySelector('#empty-state');

search?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const matches = !query || `${card.textContent} ${card.dataset.search || ''}`.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  if (emptyState) emptyState.hidden = visible !== 0;
});
