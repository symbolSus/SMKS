document.addEventListener('DOMContentLoaded', () => {
  const path = document.querySelector('#scrolling-path');
  
  // Guard clause in case the path isn't found
  if (!path) return; 
  
  const pathLength = path.getTotalLength();

  // Set up the dash array to match the precise length of the custom path
  path.style.strokeDasharray = pathLength + ' ' + pathLength;
  path.style.strokeDashoffset = pathLength;

  function drawLineOnScroll() {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Avoid division by zero if there's no scrollable area
    if (totalScroll <= 0) return; 

    const currentScroll = window.scrollY;
    
    // Calculate percentage of the page scrolled
    const scrollPercentage = currentScroll / totalScroll;
    
    // Determine how much of the path to draw
    const drawLength = pathLength * scrollPercentage;
    
    // Update the stroke-dashoffset to draw/reveal the path
    path.style.strokeDashoffset = pathLength - drawLength;
  }

  // Draw on scroll & window resize
  window.addEventListener('scroll', drawLineOnScroll);
  window.addEventListener('resize', drawLineOnScroll);

  // Trigger once on load to establish starting position
  drawLineOnScroll();
});