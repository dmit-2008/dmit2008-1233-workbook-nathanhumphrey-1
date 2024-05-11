/*
Enter JS here

HTML for list topic list item
<li class="list-group-item">
    NEW TOPIC HERE
</li>
*/

const topicForm = document.querySelector('.new-topic-form');
const topicsList = document.querySelector('.topics-list');

topicForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const topicEl = topicForm.elements['new-topic'];
  const topicText = topicEl.value.trim();

  const topicLi = `
    <li class="list-group-item">
        ${topicText}
    </li>
  `;

  topicsList.innerHTML += topicLi;
});
