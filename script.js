$(document).ready(function () {

  $.getJSON('data.json', function (data) {

    const jobListingsContainer = $('#job-listings-container');

    $.each(data, function (index, job) {

      const jobListing = $('<div class="job"></div>');

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

      jobListingsContainer.append(jobListing);
    });

    const searchBar = $("#filter-box");
    searchBar.hide();

    $(".roles label").click( function()
      {
        const labelValue = $(this).text();
        const filterBox = $("#filter-box");
        filterBox.show();
        const filter = `<label class="job-role">${labelValue}</label>`;
        filterBox.append(filter);
      }
    ); 
  })

  .fail(function (error) {
    alert('Error loading data:', error);
  });

  $('#add-job-button').click(function () {
    $('#add-job-popup').show();
});

$('#close-popup').click(function () {
    $('#add-job-popup').hide();
});


$('#job-form').submit(function (e) {
  e.preventDefault();

  // Get the values from the form fields
  const company = $('#company-name').val();
  const logo = $('#logo').val(); 
  const position = $('#position').val();
  const role = $('#role').val();
  const level = $('#level').val();
  const postedAt = $('#postedAt').val();
  const contract = $('#contract').val();
  const location = $('#location').val();
  const languages = $('#languages').val().split(',');
  const tools = $('#tools').val().split(',');

  const newJob = {
      company,
      logo,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
  };

  console.log(logo);

  const jobListing = $('<div class="job"></div>');

  jobListing.html(`
      <img src="${newJob.logo}" class="company-logo" alt="${newJob.company}">
      <div class="job-details">
          <label class="company-name">${newJob.company}</label>
          <label class="job-title">${newJob.position}</label>
          <div class="extra-details">
              <label class="time">${newJob.postedAt}</label> <label>.</label>
              <label class="type">${newJob.contract}</label> <label>.</label>
              <label class="country">${newJob.location}</label>
          </div>
      </div>
      <div class="job-roles">
          <div class="roles">
              <label class="job-role">${newJob.role}</label>
              <label class="job-role">${newJob.level}</label>
              ${newJob.languages.map(language => `<label class="job-role">${language}</label>`).join('')}
              ${newJob.tools.map(tool => `<label class="job-role">${tool}</label>`).join('')}
          </div>
      </div>
  `);

  $('#job-listings-container').append(jobListing);

  // Close the popup
  $('#add-job-popup').hide();
});

});
