/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* global Rolno, fulname, empSal, dob, da, enoldate, record, stuDBName, stuRelationName, jsonChg */

var jpdbBaseurl='http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML ='/api/iml';
var empDBname="STU-DB";
var empRelatioName="STU-DATA";
var connToken = "90932892|-31949282207682827|90948030";

$("#Rolno").focus();

function saveRecNo2ls(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getEmpIdAsJsonObj(){
    var Rolno= $('#Rolno').val();
    var jsonStr ={
        id: Rolno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2ls(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#fulname').val(record.name);
    $('#clas').val(record.salary);
    $('#dob').val(record.dob);
    $('#da').val(record.da);
    $('#enoldate').val(record.enoldate);
}

function resetForm(){
    $('#Rolno').val('');
    $('#fulname').val('');
    $('#clas').val('');
    $('#dob').val('');
    $('#da').val('');
    $('#enoldate').val('');
    $('#Rolno').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#change').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#empID').focus();
}


function ValidateData(){
    var Rolno,fulname,clas,dob,addr,enoldate;
    Rolno = $('#Rolno').val();
    fulname = $('#fulname').val();
    dob = $('#dob').val();
    addr = $('#addr').val();
    enoldate = $('#enoldate').val();
    if (Rolno ===''){
        alert('EMPLOYEE ID IS MISSING ');
        $('#Rolno').focus();
        return "";
        
    }
        if (fulname ===''){
        alert('EMPLOYEE NAME IS MISSING ');
        $('#fulname').focus();
        return "";
    }
    if (dob ===''){
        alert('EMPLOYEE HRA IS MISSING ');
        $('#dob').focus();
        return "";
    }
    if (addr ===''){
        alert('EMPLOYEE DA IS MISSING ');
        $('#addr').focus();
        return "";
    }
    if (enoldate===''){
        alert('Deduction IS MISSING ');
        $('#addr').focus();
        return "";
    }

    var jsonStrObj = {
        id: Rolno,
        name: fulname,
        class : ,
        dob: dob,
        addr : addr,
        enoldateion : enoldate 
        
    };
    
    return JSON.stringify(jsonStrObj);
}
    
function getRollNO(){
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,empIdJsonObj);
    jQuery.ajaxSetup({async : false});
    var resJsonObj = executeCommandATGivenBaseurl(getRequest, jpdbBaseurl, jpdbIRL);
    jQuery.ajaxSetup({async : true});
    if (resJsonObj.status === 400){
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#fulname').focus();
    
    }
    else if (resJsonObj.status === 200){
        $('#Rolno').prop('disabled', true);
        fillData(resJsonObj);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#fulname').focus();
    }
}

function SaveData(){
    var jsonStrObj = ValidateData();
    if (jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,stuDBName,stuRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseurl,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#empID').focus();
}

function changeData(){
    $('#change').prop('disabled', true);
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,stuDBName,stuRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async : false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseurl,jpdbIML);
    jQuery.ajaxSetup({async : true});
    console.log(resJsonObj);
    resetForm();
    $('#Rolno').focus();
}
