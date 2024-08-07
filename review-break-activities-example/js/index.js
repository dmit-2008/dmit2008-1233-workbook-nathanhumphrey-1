/*
Enter JS here

HTML for list topic list item
<li class="list-group-item">
    NEW TOPIC HERE
</li>
*/

// wrap main logic in a block to prevent global scoping
{
  const topicForm = document.querySelector('.new-topic-form');
  const topicList = document.querySelector('.topics-list');

  /**
   * Adds a li element to the topic list.
   * @param {string} topicText - the new text for the topic to add
   */
  const addNewTopic = (topicText) => {
    const li = `
            <li class="list-group-item">
                ${topicText}
            </li>`;

    topicList.innerHTML += li;
  };

  topicForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // get the input value
    const topicText = topicForm.elements['new-topic'].value.trim();

    // validate the input
    if (topicText === '') {
      topicForm.elements['new-topic'].classList.add('is-invalid');
    } else {
      topicForm.elements['new-topic'].classList.remove('is-invalid');
      addNewTopic(topicText);

      // clear the form now that the topic has been added
      topicForm.reset();
      // focus the input so the user can enter another topic
      topicForm.elements['new-topic'].focus();
    }
  });
}
