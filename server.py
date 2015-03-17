#! /usr/bin/env python2
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer as bhs
import os
#print os.environ['trelloapikey']

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    bhs.HTTPServer(("127.0.0.1", 80), CORSRequestHandler).serve_forever()
    #BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)
