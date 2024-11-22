const OPTIONS = [
    "Core & Shell",
    "Room Layout",
    "Wall types & Doors",
    "Plumbing",
    "Electrical",
    "Ceiling and Lighting",
    "Floors & Millwork",
    "Finishes",
    "Furniture"
];

const selectedOptions = {
    project1: new Set(),
    project2: new Set(),
    project3: new Set()
};

let totalSelections = 0;
const MAX_SELECTIONS = 9;

function uploadFile(projectId) {
    const projectElement = document.querySelector(`#project${projectId}`);
    
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'uploading-indicator';
    loadingIndicator.textContent = 'Uploading...';
    projectElement.appendChild(loadingIndicator);

    // Simulate upload delay
    setTimeout(() => {
        loadingIndicator.remove();
        createOptionButtons(projectId);
    }, 300);
}

// Update the createOptionButtons function
function createOptionButtons(projectId) {
    const projectElement = document.querySelector(`#project${projectId}`);
    
    // Check if options already exist
    if (projectElement.querySelector('.project-options')) {
        return;
    }

    // Add expanding class to initiate container animation
    projectElement.classList.add('expanding');

    // Create options container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'project-options';

    // Create option buttons
    OPTIONS.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'project-option';
        button.textContent = option;
        button.dataset.option = option;
        button.style.animationDelay = `${0.2 + (index * 0.05)}s`; // Stagger the animations

        // Check if this option is selected in other projects
        const isDisabled = isOptionSelectedInOtherProjects(option, projectId);
        if (isDisabled) {
            button.classList.add('disabled');
            button.disabled = true;
        }

        button.addEventListener('click', () => toggleOption(button, projectId, option));
        optionsContainer.appendChild(button);
    });

    // Append after a slight delay to ensure container expansion animation starts first
    setTimeout(() => {
        projectElement.appendChild(optionsContainer);
    }, 100);
}

// Update the toggleOption function to include animation when selecting/deselecting
function toggleOption(button, projectId, option) {
    const projectKey = `project${projectId}`;
    
    // Add transition effect
    button.style.transition = 'all 0.3s ease';
    
    if (selectedOptions[projectKey].has(option)) {
        // Deselect option with animation
        button.classList.add('deselecting');
        selectedOptions[projectKey].delete(option);
        button.classList.remove('selected');
        totalSelections--;
        
        // Enable this option in other projects
        updateOptionAvailability(option, false);
    } else {
        // Check if max selections reached
        if (totalSelections >= MAX_SELECTIONS) {
            alert('Maximum of 9 selections across all projects reached');
            return;
        }
        
        // Select option with animation
        button.classList.add('selecting');
        selectedOptions[projectKey].add(option);
        button.classList.add('selected');
        totalSelections++;
        
        // Disable this option in other projects
        updateOptionAvailability(option, true);
    }

    // Remove animation classes after transition
    setTimeout(() => {
        button.classList.remove('selecting', 'deselecting');
    }, 300);
}

// Rest of your existing code...

function updateOptionAvailability(option, isSelected) {
    document.querySelectorAll('.project-option').forEach(button => {
        if (button.dataset.option === option && !button.classList.contains('selected')) {
            button.disabled = isSelected;
            button.classList.toggle('disabled', isSelected);
        }
    });
}

function isOptionSelectedInOtherProjects(option, currentProjectId) {
    return Object.entries(selectedOptions).some(([projectKey, selections]) => {
        return projectKey !== `project${currentProjectId}` && selections.has(option);
    });
}