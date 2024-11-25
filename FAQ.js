document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Toggle the current FAQ question
        button.setAttribute('aria-expanded', !isExpanded);
        answer.style.display = isExpanded ? 'none' : 'block';

        // Collapse all other answers
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer) {
                otherAnswer.style.display = 'none';
                otherAnswer.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
