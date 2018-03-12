//These are global variables
var students = $('.student-item');
const $studentSearch ='<div class="student-search"><input id="search" placeholder="Search for students..."><button>Search</button></div>';
var pagination ='<div class="pagination"><ul></ul></div>';
var studentList = setPages(students);

// Appends the search option to the webpage
$('.page-header.cf').append($studentSearch);

// Display the current page, hide the rest. 
function pageIndication(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
}

// Generate an array of page list and set every element's length to 10 pages
function setPages(input_list) {
	var pages_array = [];
	var originalList = input_list.slice();
	while (originalList.length) {
		pages_array.push(originalList.splice(0,10));
	}
	return pages_array;
}


// Append buttons to different pages. The number of pages to show is obtained from the pageList.length.
function appendPages(pageList) {
	$('.page').append(pagination);
	var page_num = pageList.length;
	for (var i = 1; i <= page_num; i++) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');

	//Add click listeners
	  $(".pagination ul li a").on("click", function(e) {
	    var pageSelected = parseInt($(this)[0].text) - 1;
	    pageIndication(pageSelected, pageList);
	    $(".pagination ul li a").removeClass();
	    $(this).addClass("active");
	    e.preventDefault();
	  });
}

	
// Search function for searching name/e-mail. If no results are found, change the header H2 to display No Matching Results, otherwise display default Matching Students.
function searchStudent() {	
	//convert all the input name to lowercase and remove the whitespace from the beginning and ending
    var searchTerm = $('#search').val().toLowerCase().trim();

        var SearchingResults = students.filter(function(i) {
		var studentName = $(this).find('h3').text();
        	var studentEmail = $(this).find('.email').text();
            //Even part of text matches, it will still show the information of the student
            if (studentName.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
                return true;
            }
            return false;
        });
        if (SearchingResults.length === 0 ) {
        	$('.page-header h2').text('No Matching Results');
        } else {
        	$('.page-header h2').text('Matching STUDENTS');
        }
	//add page numbers to to searching results too, delete the original pagination
        var paginated_students = setPages(SearchingResults);
        $('.pagination').remove();
        if (SearchingResults.length > 10) {
          appendPages(paginated_students);
        }
        pageIndication(0, paginated_students);
}

// Initiation
appendPages(studentList);
pageIndication(0, studentList);

// Event Handlers
$('.student-search').find('button').on('click', searchStudent);
$('.student-search').find('input').keyup(searchStudent);       
