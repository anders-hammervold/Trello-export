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
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    bhs.HTTPServer(("", port), CORSRequestHandler).serve_forever()
    #BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)
