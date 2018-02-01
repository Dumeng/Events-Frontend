<?php

/**
 * Class DetailController
 */
class DetailController extends ControllerInterface
{
    public function initTemplate()
    {
        $this->setTemplate(
            'event',
            array(
                'title' => 'List Page'
            )
        );
    }

    public function initOutput()
    {
        $args=$this->getArgs();
        $args['eid']=isset($_GET['eid']) ? $_GET['eid'] : '';
        $this->setArgs($args);
    }
}
