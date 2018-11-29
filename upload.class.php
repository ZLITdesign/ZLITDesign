<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/30 0030
 * Time: 下午 17:47
 */

class upload{
    private $path="upload";
    private $file;
    function __construct($file){
        $this->file = $file;
    }
    function load(){
        //创建文件夹
        date_default_timezone_set("Asia/Shanghai");
        if(!is_dir($this->path)){
            mkdir($this->path);
        }
        $this->path = $this->path."/".date('Y-m-d');
        if(!is_dir($this->path)){
            mkdir($this->path);
        }

        //修改文件名字
        $str = $this->file['name'];
        $str = substr($str,strpos($str,'.'),4);
        $imgname = microtime(true).mt_rand(0,999999).$str;
        if(is_uploaded_file($this->file['tmp_name'])){
            $result = move_uploaded_file($this->file['tmp_name'],$this->path."/".$imgname);
            if($result){
//                echo "./upload/".date('Y-m-d')."/".$imgname;
              $response = array(
                'code' => 0,
                'msg' => "./upload/".date('Y-m-d')."/".$imgname,
                'data' => ''
              );
              echo json_encode($response);
            }
        }
    }
}

$img = new upload($_FILES['file']);
$img->load();