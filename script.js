$(document).ready(function () {
  $.getJSON('data.json', function (data) {

    const jobListingsContainer = $('#job-listings-container');

    // Loop through the data and create a job listing element for each item

    $.each(data, function (index, job) {

      const jobListing = $('<div class="job"></div>');

      // Create the HTML structure for the job listing
      
      jobListing.html(`
        <img src="${job.logo}" class="company-logo" alt="${job.company}">
        <div class="job-details">
          <label class="company-name">${job.company}</label>
          <label class="job-title">${job.position}</label>
          <div class="extra-details">
            <label class="time">${job.postedAt}</label> <label>.</label>
            <label class="type">${job.contract}</label> <label>.</label>
            <label class="country">${job.location}</label>
          </div>
        </div>
        <div class="job-roles">
          <div class="roles">
            <label class="job-role">${job.role}</label>
            <label class="job-role">${job.level}</label>
            ${job.languages.map(language => `<label class="job-role">${language}</label>`).join('')}
            ${job.tools.map(tool => `<label class="job-role">${tool}</label>`).join('')}
          </div>
        </div>
      `);

      // Append the job listing element to the container
      jobListingsContainer.append(jobListing);
    });
  })
  .fail(function (error) {
    console.error('Error loading data:', error);
  });
});
