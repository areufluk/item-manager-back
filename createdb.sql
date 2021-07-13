CREATE DATABASE itemmanager;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE category (
	category_id UUID PRIMARY KEY,
	category_name VARCHAR(50) NOT NULL
);

CREATE TABLE item (
	item_id UUID PRIMARY KEY,
	category_id UUID NOT NULL,
	item_name VARCHAR(50) NOT NULL,
	unit VARCHAR(20) NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE import_list (
	import_id UUID PRIMARY KEY,
	import_company VARCHAR(100) NOT NULL,
	dates VARCHAR(10) NOT NULL 
);

CREATE TABLE import_data (
	import_data_id UUID PRIMARY KEY,
	item_id UUID NOT NULL,
	import_id UUID NOT NULL,
	price FLOAT NOT NULL,
	amount INT NOT NULL,
	remain INT NOT NULL,
	FOREIGN KEY (item_id) REFERENCES item(item_id),
	FOREIGN KEY (import_id) REFERENCES import_list(import_id)
);

CREATE TABLE export_list (
	export_id UUID PRIMARY KEY,
	dates VARCHAR(10) NOT NULL,
	department VARCHAR(50) NOT NULL,
	ex_name VARCHAR(100) NOT NULL
);

CREATE TABLE export_data (
	export_data_id UUID PRIMARY KEY,
	import_data_id UUID NOT NULL,
	export_id UUID,
	require INT NOT NULL,
	get_amount INT NOT NULL,
	FOREIGN KEY (import_data_id) REFERENCES import_data(import_data_id),
	FOREIGN KEY (export_id) REFERENCES export_list(export_id)
);