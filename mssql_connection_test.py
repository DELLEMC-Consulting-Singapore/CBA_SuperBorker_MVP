import pymssql
import logging
#logging.basicConfig(level=logging.INFO)

#import sys
#sys.path.append('/usr/local/lib64/python3.6/site-packages/pymssql')
 
def connect_to_sql_server(server, database, username, password, port):
    try:
        # Establish connection to SQL Server
        conn = pymssql.connect(server=server, user=username, password=password, database=database, port=port)

        # Create a cursor object
        cursor = conn.cursor()
 
        print("Connection to SQL Server successful!")
 
        return conn, cursor
        
 
    except Exception as e:
        print(f"Error connecting to SQL Server: {e}")
        return None, None
 
def execute_query(cursor, query):
    try:
        # Execute SQL query
        test = cursor.execute(query)
        print(test)
        
        # Fetch all the rows returned by the query
        # rows = cursor.fetchall()
        # print(rows)
 
        # return rows
 
    except Exception as e:
        print(f"Error executing query: {e}")
        return None
 
def close_connection(conn, cursor):
    try:
        # Close cursor and connection
        cursor.close()
        conn.close()
        print("Connection closed.")
 
    except Exception as e:
        print(f"Error closing connection: {e}")
 
if __name__ == "__main__":
    # Connection parameters
    server = "10.45.198.34"
    database = "OSBDB"
    username = "acoe_sqlapp_osb"
    password = "UXAp!1thoTmMzPq"
    port = "1433"
 
    # SQL query
    query_create = '''CREATE TABLE Services (
    id INT IDENTITY(1,1) PRIMARY KEY,
    request_id VARCHAR(50),
    transaction_id VARCHAR(50),
    service_name VARCHAR(50),
    service_action VARCHAR(50),
    running_status VARCHAR(50),
    created_by VARCHAR(50),
    payload NVARCHAR(MAX),
    date_time VARCHAR(50),
    deployment_id VARCHAR(50),
    deployment_name VARCHAR(50),
    source VARCHAR(50),
    deploy_status NVARCHAR(MAX),
    deploy_status_history NVARCHAR(MAX),
    childrens NVARCHAR(MAX),
    updated_at VARCHAR(50)
    );'''

    query_alter = '''ALTER TABLE services 
    DROP COLUMN id; 
    ALTER TABLE services
    ADD id INT IDENTITY(1,1) PRIMARY KEY;'''

    query_drop = '''DROP TABLE Services;'''

    query_insert = '''  INSERT INTO services (
    request_id,
    transaction_id,
    service_name,
    service_action,
    status,
    created_by,
    payload,
    date_time,
    deployment_id,
    deployment_name,
    source,
    deploy_status,
    deploy_status_history,
    childrens
) VALUES (
    'REQ2399',
    '7641-toM3-1709689515726-oFaM',
    'DevBox',
    'CREATE',
    'completed',
    'admin',
    N'{"key1": "value1", "key2": "value2"}',
    '03-06-2024 12:45',
    'deploy123',
    'example_deployment',
    'API',
    N'{"status": "running"}',
    N'{"events": [{"name": "event1"}, {"name": "event2"}]}',
    N'{"child1": {"status": "pending"}, "child2": {"status": "running"}}'
);'''   
    req_id = 'REQ2005'
    id = 5
    query_update = f"UPDATE Services SET request_id='{req_id}' WHERE id='{id}'"

    query_select = '''SELECT * FROM services;''' 

    query_truncate = '''TRUNCATE TABLE Services'''
    conn, cursor = connect_to_sql_server(server, database, username, password, port)
 
    
    if conn and cursor:
        # Execute SQL query
        rows = execute_query(cursor, query_create)
        conn.commit()
        # if rows:
        #     # Print fetched rows
        #     for row in rows:
        #         print(row)
        # Close connection
        close_connection(conn, cursor)
