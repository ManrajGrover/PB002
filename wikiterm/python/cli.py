#!/usr/bin/env python
"""CLI for searching and getting link of topic from wikipedia
"""
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

    Parameters
    ----------
    search : str
        String to be searched
    file : str
        File name
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
    search_links = data[3]

    if (len(search_links) == 0):
        print "No link found!"
    else:
        try:
            file = open(file, 'a')
            file.write(search_links[0] + "\n")
            file.close()
            print "Link has been logged!"
        except:
            print "Error occured!"
            sys.exit(0)

if __name__ == '__main__':
    main()
