import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the user',
  inject ([HttpTestingController],
    (httpMock: HttpTestingController) => {
      const loginValue = {
        email: 'admin@xyz.com',
        password: '123456'
      };
      service.login(loginValue).subscribe((data: any[]) => {
        expect(data.length).toBe(1);
      });
      const mockRequest = httpMock.expectOne(`${service.BACKEND_URL}/users`);
      expect(mockRequest.request.method).toEqual('POST');
    })
  );

  it('should remove item from localstorage' , () => {
   service.logout();
   expect(localStorage.getItem('adminInfo')).toBeNull();
  });

  it('should add item to localstorage' , () => {
    const user = {
      email: 'admin@xyz.com',
      password: '123456'
    };
    const adminInfo = {
      ...user,
      timeStamp: new Date()
    };
    service.login(user);
    localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
    expect(localStorage.getItem('adminInfo')).toBe(JSON.stringify(adminInfo));
   });

  it('should set isLogged in to true' , () => {
    const user = {
      email: 'admin@xyz.com',
      password: '123456'
    };
    const adminInfo = {
      ...user,
      timeStamp: new Date()
    };
    service.login(user);
    service.isLoggedIn.next(true);
    expect(service.isLoggedIn.value).toBeTrue();
   });
});

