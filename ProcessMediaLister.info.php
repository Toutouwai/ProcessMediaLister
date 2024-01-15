<?php namespace ProcessWire;

$info = array(
	'title' => 'Media Lister',
	'summary' => 'Lists images and files from across the site in a sortable and filterable table.',
	'version' => '0.1.2',
	'author' => 'Robin Sallis',
	'href' => 'https://github.com/Toutouwai/ProcessMediaLister',
	'icon' => 'th-large',
	'requires' => 'ProcessWire>=3.0.226, PHP>=7.0.0',
	'installs' => 'MediaListerHooks',
	'page' => array(
		'name' => 'media-lister',
		'title' => 'Media Lister',
		'parent' => 'setup',
	),
	'permission' => 'media-lister',
	'permissions' => array(
		'media-lister' => 'Use the Media Lister module'
	),
	'useNavJSON' => true,
);
