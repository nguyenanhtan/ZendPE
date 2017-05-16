<?php
class Fronten_IndexController extends Zend_Controller_Action{
    public function init(){
        $this->view->headTitle("Irregular Game");
        $this->view->headScript()->prependFile($this->view->baseUrl("/public/asserts/scripts/frScript.js"));
        $this->view->headScript()->prependFile($this->view->baseUrl("/public/asserts/scripts/jquery-3.2.1.min.js"));
        $this->view->headScript()->prependFile($this->view->baseUrl("/public/asserts/bootstrap-3.3.7-dist/js/bootstrap.min.js"));
        
        //$this->view->headScript()->prependFile('https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/public/asserts/css/frStyle.css"));
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/public/asserts/css/style.css"));
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/public/asserts/bootstrap-3.3.7-dist/css/bootstrap.min.css"));
        
    }
    public function indexAction(){
        /*$irregular = new Model_Irregular;
        echo "<pre>";
        print_r($irregular->listall());
        echo "</pre";*/
    }
    public function irregularAction(){
        $irregular = new Model_Irregular;
        
        $this->view->listIr = $irregular->listall();
       
    }
}
