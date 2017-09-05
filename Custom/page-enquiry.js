//Initialise global variablesvar g_spamsubmissiontimer = {{ Retrieved Server Side }};var g_country = decodeHTML("{{ Retrieved Server Side }}");var g_post = decodeHTML("{{ Retrieved Server Side }}");var g_enquirytext = decodeHTML("{{ Retrieved Server Side }}");var g_countryid = "{{ Retrieved Server Side }}";var g_postid = "{{ Retrieved Server Side }}";(function ($) {    $(document).ready(function () {        //Set up event listeners for Radio Buttons        $("input[name='radio-inline-group']:radio").change(function() {            var radioselected = $(this).val();                                                            if(radioselected == 'Yes') {                $("#great").show();                $("#contact-details").hide();            }            else if(radioselected == 'No') {                $("#contact-details").show();                $("#great").hide();            }        });                            //Logic to automatically set the radio button value to 'No' and show the Form if the page has been reloaded due to server side errors        (function openEnquiryIfInvalid() {            if($("#radio-other-address").is(":checked")) {                $("#radio-other-address").prop("checked", true).change();                $("#radio-other-address").get(0).scrollIntoView();            }                                if($(".validation-summary").length && ($(".validation-summary").css("display") != "none")) {                $("#radio-other-address").prop("checked", true).change();                if($(".validation-summary").length) {                    $(".validation-summary").get(0).scrollIntoView();                }            }        })();                            //Set More Topics link        $("#moreTopics a").attr("href", "{{ Retrieved Server Side }}?q=" + encodeURIComponent(g_enquirytext) + ", " + encodeURIComponent(g_country));                            //Logic for retrieving GOV.UK search results        var xmlHttp;        if(window.XDomainRequest) {            xmlHttp = new XDomainRequest();            xmlHttp.onload = function() { requestCallback(JSON.parse(xmlHttp.responseText)); };        }        else if(window.XMLHttpRequest) {            xmlHttp = new XMLHttpRequest();        }        else {            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");        }                            xmlHttp.onreadystatechange = function() {            if(xmlHttp.readyState == 4) {                if(xmlHttp.status == 200)                    requestCallback(JSON.parse(xmlHttp.responseText));                else {                    $("#moreTopics").hide();                    $("#noTopics").show();                }            }        };                            //Make request to GOV.UK        xmlHttp.open("GET", "{{ Retrieved Server Side }}" + encodeURIComponent(g_enquirytext) + ", " + encodeURIComponent(g_country), true);        xmlHttp.send();                            function requestCallback(result) {            try {                if (result && result.results) {                    var topics = [];                    //Populate Enquiry Entity Form values                    $(result.results).each(function (index) {                        topics[index] = '<li><a onclick="javascript:_paq.push([\'trackEvent\', \'click\' , \'SearchLinks\', \'Link ' + (index + 1) + '\']);" href=' + 'https://www.gov.uk' + this.link + '>' + this.title + '</a></li>';                        $("#cap_searchtopic" + (index + 1)).val(this.title);                        $("#cap_searchlink" + (index + 1)).val(this.link);                        $("#cap_searchtype" + (index + 1)).val(this.format);                    });                                                //Put the topics in the correct order and then append them into the DOM                    $(topics.reverse()).each(function (index) {                        $(ulTopics).prepend(topics[index]);                    });                        //If no topics are found after the search, render a friendly message                    if (result.results && result.results.length > 0) {                        $("#moreTopics").show();                        $("#noTopics").hide();                    }                    else {                        $("#moreTopics").hide();                        $("#noTopics").show();                    }                }            }            catch(error) {                //If there is an error during the search, render a friendly error message                $("#moreTopics").hide();                $("#noTopics").show();            }        }    });                    //If cookies are not enabled, hide the Enquiry form and do not let the user continue    (function checkCookieEnabled() {        document.cookie = "testcookie";         var cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;        if(!cookieEnabled) {            $("#enquiryContinue").hide();            $("#cookiesDisabled").show();        }    })();}(jQuery));            //Function to decode HTMLfunction decodeHTML(input) {    var elem = document.createElement('textarea');    elem.innerHTML = input;    return elem.value;}