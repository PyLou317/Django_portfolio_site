from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPageNumberPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        print("get_paginated_response called") # Added line
        print(f"Current page: {self.page.number}")
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'current_page': self.page.number,  # Add current page number
            'total_pages': self.page.paginator.num_pages, # Add total pages.
            'results': data,
        })