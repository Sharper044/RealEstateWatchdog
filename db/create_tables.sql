CREATE TABLE rew_users (
id SERIAL PRIMARY KEY,
auth0_id TEXT,
email TEXT);

CREATE TABLE rew_searches (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES rew_users(id),
location TEXT,
ammount INT,
cash_deal INT,
move_in INT,
rate FLOAT(5),
sort_by INT);

CREATE TABLE rew_properties (
id SERIAL PRIMARY KEY,
list_price INT,
street_number TEXT,
street_name TEXT, 
street_suffix TEXT,
city TEXT,
state TEXT,
postal_code INT);

INSERT INTO rew_properties ( list_price, street_number, street_name, street_suffix, city, state, postal_code )
VALUES ( 414000, '3463', 'E Chimney Rock', 'Dr', 'St George', 'UT', 84790 ),
        ( 209900, '840', 'S 400 E APT', '72', 'Saint George', 'UT', 84770 ),
        ( 368000, '1027', 'N 1700', 'E', 'Saint George', 'UT', 84770 ),
        ( 264900, '1845', 'W Canyon View Dr APT', '1430', 'Saint George', 'UT', 84770 ),
        ( 384000, '611', 'E Ducati', 'Way', 'Saint George', 'UT', 84790 ),
        ( 359900, '2818', 'E Carmine', 'Dr', 'Saint George', 'UT', 84790 ),
        ( 295000, '810', 'S Dixie Dr UNIT', '2414', 'Saint George', 'UT', 84770 ),
        ( 275000, '810', 'S Dixie Dr UNIT', '2412', 'Saint George', 'UT', 84770 ),
        ( 344900, '1144', 'W Bloomington Dr', 'S', 'Saint George', 'UT', 84790 ),
        ( 429900, '249', 'Oasis', 'Dr', 'Saint George', 'UT', 84770 ),
        ( 174900, '776', 'Sunrise', 'Ct', 'Saint George', 'UT', 84770 ),
        ( 365000, '1240', 'Oak', 'Cir', 'Saint George', 'UT', 84790 ),
        ( 419000, '1795', 'N Snow Canyon Pkwy UNIT', '40', 'Saint George', 'UT', 84770 ),
        ( 1699000, '2436', 'E 3910', 'S', 'Saint George', 'UT', 84790 ),
        ( 479900, '149', 'S Acantilado', 'Dr', 'Saint George', 'UT', 84790 ),
        ( 289000, '1854', 'Stonebridge', 'Dr', 'Saint George', 'UT', 84770 ),
        ( 247900, '4402', 'Ironwood', 'Dr', 'Saint George', 'UT', 84790 ),
        ( 225000, '1911', 'W 975', 'N', 'Saint George', 'UT', 84770 ),
        ( 399900, '1754', 'S 1430 East', 'Cir', 'Saint George', 'UT', 84790 ),
        ( 274368, '2148', 'S Legacy', 'Dr', 'Saint George', 'UT', 84770 ),
        ( 50000, '1225', 'N Dixie Downs', 'Rd', 'Saint George', 'UT', 84770 ),
        ( 61997, '1450', 'N Dixie Downs Rd TRLR', '1', 'Saint George', 'UT', 84770 ),
        ( 95000, '2018', 'W 1760', 'N', 'Saint George', 'UT', 84770 ),
        ( 119900, '455', 'S 1100 E APT', '29', 'Saint George', 'UT', 84790 ),
        ( 119900, '2990', 'E Riverside Dr UNIT', '73', 'Saint George', 'UT', 84790 );
        