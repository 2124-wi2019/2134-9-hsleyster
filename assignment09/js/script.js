$(document).ready(function () {
    $('#holder').hide();
    $('#get-employees').fadeIn();
    $('#get-employees').click(function () {
        $(this).fadeOut();
            $('#loader').fadeIn(function () {
                $.ajax({
                    url:"https://www.mccinfo.net/epsample/employees",
                }).done(onAjaxComplete);
            });
        });

    function onAjaxComplete(data){
        let employees = $.parseJSON(data);
        let s = "";
            for(let i = 0; i < employees.length; i++){
                s += "<h3>" + employees[i].first_name + "" + employees[i].last_name + "</h3>";
                s += "<div id='" + employees[i].id + "'>";
                s +=    "<p> First Name: " + employees[i].first_name + "</p>";
                s +=    "<p> Last Name: " + employees[i].last_name + "</p>";
                s +=    "<p> Image: ";
                s +=    "<img src='" + employees[i].image_filename + "'alt= 'Image'/>";
                s +=    "<button id= '" + employees[i].id + "'" + "class= 'get-info'>Get Info</button>";
                s +=    "<br /> <br />";
                s += "</div>";
                /*if( i != employees.length - 1){
                    s += "<hr />";
                }
                */
                $('#holder').html(s);
                $('#loader').fadeOut(function () {
                    $('#holder').accordion({
                        heightStyle: "content"
                    });
                    $('#holder').fadeIn();
                });

                $('.get-info').click(function(evt){
                    console.log(this.id);
                    evt.stopImmediatePropagation();
                    $.ajax({
                        url: "https://www.mccinfo.net/epsample/employees/" + this.id
                    }).done(showEmployeeInfo);
                });
            }
        }
    function showEmployeeInfo(data){
        let employee = $.parseJSON(data);
        console.log(employee);
        let name = employee.first_name + "" + employee.last_name;
        let salary = accounting.formatMoney(employee.annual_salary);
        $('#dialog').attr('title', name);
        let s = "";
        s += "<p>Image: </p>";
        s += "<img src= '" + employee.image_filename + "'alt= 'Image'/>";
        s += "<p>Hire Date: " + employee.hire_date + "</p>";
        s += "<p>Salary: " + salary + "</p>";
        s += "<p>Department: " + employee.department.name + "</p>";
        $('#dialog').html(s);
        $('#dialog').dialog();
        }
});