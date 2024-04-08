from dotenv import load_dotenv

import os
import urllib.parse

APP_ROOT = "./"

load_dotenv('.env')

DEBUG = int(os.getenv('DEBUG'))

MAINTENANCE = os.getenv('MAINTENANCE')

INSTAGRAM_LINK = 'https://instagram.com/madpixelsort'
TWITTER_LINK = 'https://twitter.com/madpixelsort'
YOUTUBE_LINK = 'https://www.youtube.com/channel/UCMGddKLu8RNtuAdqdBYb9SA'


