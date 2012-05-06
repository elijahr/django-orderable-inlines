# -*- coding: utf-8 -*-

from setuptools import setup, find_packages


with open('README.md') as f:
    readme = f.read()

with open('LICENSE') as f:
    license = f.read()

setup(
    name='django-orderable-inlines',
    version='0.0.1',
    description='Draggable TabularInlines and StackedInlines for Django',
    long_description=readme,
    author='Elijah Rutschman',
    author_email='elijahr+django-orderable-inlines@gmail.com',
    url='https://github.com/elijahr/django-orderable-inlines',
    license=license,
    packages=find_packages(exclude=('tests',)),
    package_data={ 'orderable_inlines': ['static/*'], },
)
