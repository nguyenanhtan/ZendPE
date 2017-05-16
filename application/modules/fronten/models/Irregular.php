<?php
class Model_Irregular{// extends Zend_Db_Table_Abstract{
    /*protected $_name = "IRREGULAR";
    protected $_primary = "id";
    public function listAll(){        
        return $this->fetchall()->toArray();
    }*/
    protected $db;
    public function __construct(){
        $this->db=Zend_Registry::get('db');
    }
    public function listall(){ 
        $sql=$this->db->query("select `id`,`simple`,`simple_past`,`past_participle`,`meaning` from IRREGULAR");
        return $sql->fetchAll();
    }
}