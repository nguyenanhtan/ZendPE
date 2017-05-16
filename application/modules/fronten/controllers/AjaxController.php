<?php
class Fronten_AjaxController extends Zend_Controller_Action{
    public function init()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
       /* if (!$this->_request->isXmlHttpRequest())
        {
            //$this->_redirect("/fronten/index/index");
            //echo json_encode(array('id'=>"123",'name'=>"TAN"));;
        }*/
    }
    public function loadirregularAction(){
        $irregular = new Model_Irregular;
        //echo "HHH";
       //print_r($irregular->listall());
       echo Zend_Json::encode($irregular->listall());
//        echo json_encode(array('id'=>$_POST["id"],'name'=>$_POST["name"]));
//        echo json_encode(array('id'=>"123",'name'=>"TAN"));;
    }
}