DROP DATABASE IF EXISTS reviewdb;

CREATE DATABASE IF NOT EXISTS reviewdb;

USE reviewdb;

CREATE TABLE business (
    business_id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Business ID (should be autoincrement)',
    business_name          VARCHAR(50) NOT NULL COMMENT 'Name of the business',
    business_contact_email VARCHAR(30) NOT NULL,
    business_contact_phone VARCHAR(10),
    owner_id               INT
);

#ALTER TABLE business ADD CONSTRAINT business_pk PRIMARY KEY ( business_id );

ALTER TABLE business ADD CONSTRAINT business_uq_name UNIQUE ( business_name );

CREATE TABLE category (
    category_id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name        VARCHAR(50) NOT NULL,
    category_description VARCHAR(200)
);

ALTER TABLE category ADD CONSTRAINT category_uq_name UNIQUE ( category_name );

CREATE TABLE owner (
    owner_id       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    owner_email    VARCHAR(50) NOT NULL,
    owner_password VARCHAR(200) NOT NULL
);

ALTER TABLE owner ADD CONSTRAINT owner_email_uq UNIQUE ( owner_email );

CREATE TABLE review (
    review_id                     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    review_date                   DATETIME NOT NULL,
    review_rating                 DOUBLE NOT NULL,
    review_description            VARCHAR(300) NOT NULL,
    review_recommended            BOOL NOT NULL,
    user_id                       INT NOT NULL,
    store_id                      INT NOT NULL,
    review_business_response      VARCHAR(300),
    review_business_response_date DATETIME,
    business_id            INT
);

CREATE TABLE review_image (
    review_image_id     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    review_id           INT NOT NULL,
    review_image_filename   VARCHAR(300)
);

CREATE TABLE store (
    store_id      INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    store_name    VARCHAR(50) NOT NULL,
    store_description VARCHAR(500) NOT NULL,
    store_address_street VARCHAR(50) NOT NULL,
    store_address_suburb VARCHAR(30) NOT NULL,
    store_address_postcode INT(4) NOT NULL,
    store_geopoint POINT NOT NULL,	
    store_contact_phone VARCHAR(10),
    store_contact_email VARCHAR(30),
    store_contact_website VARCHAR(100),
    store_file_name VARCHAR(100),
    business_id   INT
);

CREATE TABLE store_category (
    store_id      INT NOT NULL,
    category_id   INT NOT NULL
);

ALTER TABLE store_category ADD CONSTRAINT store_category_pk PRIMARY KEY ( category_id,
                                                                          store_id );

CREATE TABLE `USER` (
    user_id       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_email    VARCHAR(50) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_username VARCHAR(50) NOT NULL
);

ALTER TABLE `USER` ADD CONSTRAINT user_uq_email UNIQUE ( user_email );

CREATE TABLE user_favourite (
    user_favourite_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id           INT NOT NULL,
    store_id          INT NOT NULL
);

ALTER TABLE user_favourite ADD CONSTRAINT user_favourite_uq UNIQUE ( user_id,
                                                                     store_id );

ALTER TABLE business
    ADD CONSTRAINT business_owner_fk FOREIGN KEY ( owner_id )
        REFERENCES owner ( owner_id );

ALTER TABLE store_category
    ADD CONSTRAINT category_store_category_fk FOREIGN KEY ( category_id )
        REFERENCES category ( category_id );

ALTER TABLE review
    ADD CONSTRAINT review_store_fk FOREIGN KEY ( store_id )
        REFERENCES store ( store_id );

ALTER TABLE review
    ADD CONSTRAINT review_user_fk FOREIGN KEY ( user_id )
        REFERENCES `USER` ( user_id );

ALTER TABLE review
    ADD CONSTRAINT business_id_fk FOREIGN KEY ( business_id )
        REFERENCES business (business_id);
    
ALTER TABLE store
    ADD CONSTRAINT store_business_fk FOREIGN KEY ( business_id )
        REFERENCES business ( business_id );

ALTER TABLE store_category
    ADD CONSTRAINT store_store_category_fk FOREIGN KEY ( store_id )
        REFERENCES store ( store_id );

ALTER TABLE user_favourite
    ADD CONSTRAINT user_favourite_store_fk FOREIGN KEY ( store_id )
        REFERENCES store ( store_id );

ALTER TABLE user_favourite
    ADD CONSTRAINT user_favourite_user_fk FOREIGN KEY ( user_id )
        REFERENCES `USER` ( user_id );

ALTER TABLE review_image
    ADD CONSTRAINT review_image_review_id_fk FOREIGN KEY ( review_id )
        REFERENCES review ( review_id );