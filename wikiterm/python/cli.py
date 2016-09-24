#!/usr/bin/env python
import click
import requests
import constants
import sys

@click.command()
@click.option('--search', prompt='Search term',
              help='Term that needs to be searched.')
@click.option('--file', default='links.log', prompt='File name',
              help='File name for logging the links.')
def main(search, file):
    """
    Programs that gets link of particular topic from wikipedia
    and logs it to provided file 
    """

    payload = {
        "action": "opensearch",
        "format": "json",
        "namespace": 0,
        "limit": 1,
        "profile": "fuzzy",
        "search": search
    }

    r = requests.get(constants.API_URL, params=payload)

    data = r.json()
    searchLinks = data[3]

    if (len(searchLinks) == 0):
        print "No link found!";
    else:
        try:
            file = open(file, 'a')
            file.write(searchLinks[0]+"\n")
            file.close()
            print "Link has been logged!"
        except:
            print "Error occured!"
            sys.exit(0)

if __name__ == '__main__':
    main()
