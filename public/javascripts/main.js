function loadConfigs(){
    $.ajax({
      url : "/getConfigs",
      type: "GET",
      data: {},
      success: function(data, textStatus, jqXHR)
      {

          //alert(data);
          var htm = '<ul class="slds-has-dividers_bottom slds-has-block-links_space">';
          data.forEach(row => {
            htm += '<li class="slds-item"><a class="configLink" id="configLink_' + row.id + '" cName="' + row.oportunity + '">' + row.oportunity + '</a></li>';
          });                                       
          htm += "</ul>"            
          $("#configList").html(htm);            
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
  
      }
    });
  }

  function loadPackages(){
    $.ajax({
      url : "/getPacks",
      type: "GET",
      data: {},
      success: function(data, textStatus, jqXHR)
      {
        var htm = `<ul class="slds-vertical-tabs__nav" role="tablist" aria-orientation="vertical">`
        var icons = ['opportunity', 'account', 'case'];
        var packages = []
        data.forEach((pack, i) => { 
            packages.push(pack.package);
            
            htm += '<li class="slds-vertical-tabs__nav-item '
            htm += i == 0 ? "slds-is-active" : "";
            htm += ' title="Tab' + (i + 1) + '" role="presentation" id="tabNavli_' + i + '">';
            htm += '<a class="slds-vertical-tabs__link" href="javascript:void(0)" role="tab" tabindex=';
            htm += i == 0 ? "0" : "-1";
            htm += '" aria-selected="' + i == 0 ? "true" : "false" + '" aria-controls="slds-vertical-tabs-'+ i + '" id="tabNav_' + i + '">';
            htm += '<span class="slds-vertical-tabs__left-icon">'
            htm += '<span class="slds-icon_container slds-icon-standard-opportunity" title="Description of icon when needed">'
            htm += '<svg class="slds-icon slds-icon_small" aria-hidden="true">'
            htm += '<use xlink:href="/slds/assets/icons/standard-sprite/svg/symbols.svg#' + icons[i] + '"></use>'
            htm += '</svg></span></span>'
            htm += '<span class="slds-vertical-tabs__left-icon"></span><span class="slds-truncate" title="' + pack.package + '">' + pack.package + '</span>';
            htm += '<span class="slds-vertical-tabs__right-icon"></span></a></li>';
            
        });          
        
        htm += '</ul>';                               
        $("#packages").val(JSON.stringify(packages)); //store array
        
        data.forEach((pack, i) => { 
          htm += '<div class="slds-vertical-tabs__content ';
          htm += i == 0 ? 'slds-show' : 'slds-hide';
          htm += '" id="tabContainer_' + i +'" role="tabpanel" aria-labelledby="slds-vertical-tabs-' + i + '__nav">';
          htm += '<div class="slds-text-longform"><h3 class="slds-text-heading_medium">What is included in the ' + pack.package + ' package</h3>';
          htm += `<table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_col-bordered">
                  <thead>
                  <tr class="slds-line-height_reset">
                  <th class="" scope="col">
                    <div class="slds-truncate" title="Opportunity Name">Item</div>
                  </th>
                  <th class="" scope="col">
                    <div class="slds-truncate" title="Opportunity Name">Included</div>
                  </th>
                  <th class="" scope="col">
                    <div class="slds-truncate" title="Opportunity Name">Total Recommended</div>
                  </th>
                  </thead>
                  <tr>
                    <td>Commercial IP's</td>
                    <td>
                      ` + pack.commercialIPs + `
                    </td>
                    <td><span id="` + pack.package + `_rCommercialIPs"></span>
                  </tr>
                  <tr>
                    <td>Transactional IP's</td>
                    <td>
                      ` + pack.transactionalIPs+ `
                    </td>
                    <td><span id="` + pack.package + `_rCommercialtxnIPs"></span>
                  </tr>
                  <tr>
                    <td>Private Domains</td>
                    <td>
                      ` +pack.privateDomains+ `
                    </td>
                    <td><span id="` + pack.package + `_rPrivateDomains"></span>
                  </tr>
                  <tr>
                    <td>SAP's included</td>
                    <td>
                      ` + pack.SAPs+ `
                    </td>
                    <td><span id="` + pack.package + `_rSAP"></span>
                  </tr>
                </table>
              </div>
            </div>`
        });
        
        $("#tabWrapper").html(htm);            
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
  
      }
    });
  }
  $(document).ready(function () {

   
    loadConfigs();

    loadPackages();


    //Handle Tab Click
    $(document.body).on("click", ".slds-vertical-tabs__link", function () {
      var id = $(this).attr("id").split("_")[1];
      //set active tab nav
      $(".slds-vertical-tabs__link").attr("aria-selected", "false")
      $(this).attr("aria-selected", "true")
      $(".slds-vertical-tabs__nav-item").removeClass("slds-is-active");
      $("#tabNavli_" + id).addClass("slds-is-active");


      //remove show from all tabContainers, then add hide to all containers
      $(".slds-vertical-tabs__content").removeClass("slds-show");
      $(".slds-vertical-tabs__content").addClass("slds-hide");
      //now show the specific tab container
      $("#tabContainer_" + id).addClass("slds-show")
      $("#tabContainer_" + id).removeClass("slds-hide")

    })


    $("#form-element-txnDedicatedIP").on("click", function(){        
      if($(this).prop("checked")){
        $("#txnWrapper").css("display", "");
      }else{
        $("#txnWrapper").css("display", "none");
      }
      
      
    })      

    $("#btnModal_cancel").on("click", function(){
      $("#modalWrapper").css("display", "none");
    })
    $("#btnNew").on("click", function () {
      $("#modalWrapper").css("display", "");
    });
    

    $("#btnModal_save").on("click", function () {                       
      $.ajax({
        url : "/create",
        type: "POST",
        data: { 
          createdBy:$("#currentUser").val(), 
          description: $("#form-element-description").val(),
          account: $("#form-element-account").val(),
          accountURL: $("#form-element-accountURL").val(),
          oportunity: $("#form-element-oportunity").val(),
          oportunityURL: $("#form-element-oportunityURL").val(),
          yearlySendVolume: $("#form-element-yearlySendVolume").val(),
          dailySendVolume: $("#form-element-dailySendVolume").val(),
          hourlySendVolume: $("#form-element-hourlySendVolume").val(),
          txnDedicatedIP: $("#form-element-txnDedicatedIP").prop('checked'),
          txnDailySendVolume: $("#form-element-txnDailySendVolume").val(),
          buFullBranding: $("#form-element-buFullBranding").val(),
          buPartialBranding: $("#form-element-buPartialBranding").val(),
          dedicatedDB: $("#form-element-dedicatedDB").prop('checked'),
          SSL: $("#form-element-SSL").prop('checked')
        },
        success: function(row, textStatus, jqXHR)
        {
          loadConfigs();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
    
        }
      });
      $("#modalWrapper").css("display", "none");
    })
    $(document.body).on("click", ".configLink", function () {
              
      //Get the id of the clicked config
      var id = $(this).attr("id").split("_")[1];
      $.ajax({
        url : "/getConfig",
        type: "POST",
        data: {configID: id},
        success: function(row, textStatus, jqXHR)
        {            
          $("#configName").html(row.oportunity);
          var htm = ` <table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_col-bordered">
            
            <tr>
              <td>Account</td>
              <td><a href="` + row.accountURL + `">`+ row.account + `</a></td>
            </tr>
            <tr>
              <td>Oportunity</td>
              <td><a href="` + row.oportunityURL + `">` + row.oportunity +`</a></td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>` + row.createdBy + `</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>` + row.description + `</td>
            </tr>
            <tr>
              <td>Yearly send Volume</td>
              <td>`+ row.yearlySendVolume +`</td>
            </tr>
            <tr>
              <td>Daily send Volume</td>
              <td>
                `+ row.dailySendVolume + `
              </td>
            </tr>
            <tr>
              <td>Hourly send Volume</td>
              <td>
                `+ row.hourlySendVolume + `
              </td>
            </tr>
            <tr>
              <td>Transactional Dedicated IP's</td>
              <td>
                `+ row.txnDedicatedIP + `
              </td>
            </tr>
            <tr>
              <td>Transactional Send Volume</td>
              <td>
                `+ row.txnDailySendVolume + `
              </td>
            </tr>
            <tr>
              <td>BU's with full branding</td>
              <td>
                `+ row.buFullBranding + `
              </td>
            </tr>
            <tr>
              <td>BU's with partial branding</td>
              <td>
                `+ row.buPartialBranding + `
              </td>
            </tr>
            <tr>
              <td>Dedicated Database</td>
              <td>
                `+ row.dedicatedDB + `
              </td>
            </tr>
            <tr>
              <td>SSL</td>
              <td>
                `+ row.SSL + `
              </td>
            </tr>
            <tr>
              <td>Total Commercial IP's</td>
              <td>
                `+ row.TotalCommercialIPs + `
              </td>
            </tr>
            <tr>
              <td>Total Transactional IP's</td>
              <td>
                `+ row.TotalTransactionalIPs + `
              </td>
            </tr>
            <tr>
              <td>Total Private Domains</td>
              <td>
                `+ row.TotalPrivateDomains + `
              </td>
            </tr>
            <tr>
              <td>Total SAP's</td>
              <td>
                `+ row.TotalSAPs + `
              </td>
            </tr>
            <tr>
              <td>Dedicated DB required</td>
              <td>
                `+ row.DedicatedDB + `
              </td>
            </tr>
            <tr>
              <td>Total SSL's needed</td>
              <td>
                `+ row.TotalSSL + `
              </td>
            </tr>
            
            
          </table>
          `                                            
          $("#configDetail").html(htm);    
          
          var packs = JSON.parse($("#packages").val());
          packs.forEach((pack) => {                                     
            $("#" + pack + "_rCommercialIPs").text(row.TotalCommercialIPs - $("#" + pack + "_rCommercialIPs").closest('td').prev('td').text())
            $("#" + pack + "_rCommercialtxnIPs").text(row.TotalTransactionalIPs - $("#" + pack + "_rCommercialtxnIPs").closest('td').prev('td').text())
            $("#" + pack + "_rPrivateDomains").text(row.TotalPrivateDomains - $("#" + pack + "_rPrivateDomains").closest('td').prev('td').text())
            $("#" + pack + "_rSAP").text(row.TotalSAPs - $("#" + pack + "_rSAP").closest('td').prev('td').text())
          });            
            
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
    
        }
      });
    })
  });