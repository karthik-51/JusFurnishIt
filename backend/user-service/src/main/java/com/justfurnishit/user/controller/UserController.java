package com.justfurnishit.user.controller;

import com.justfurnishit.user.model.User;
import com.justfurnishit.user.repository.UserRepository;
import com.justfurnishit.user.security.JwtUtil;
import com.justfurnishit.user.service.UserService;
import com.justfurnishit.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;

    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            User user = new User();
            user.setFullName(request.get("fullName"));
            user.setEmail(request.get("email"));
            user.setPassword(request.get("password"));
            user.setRole(User.Role.valueOf(request.get("role").toUpperCase()));

            userService.register(user, request.get("confirmPassword"));
            return ResponseEntity.ok("Registration successful");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

  
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        return userService.login(request.get("email"), request.get("password"))
                .map(user -> {
                    String token = jwtUtil.generateToken(user);
                    return ResponseEntity.ok(Map.of(
                            "userId", user.getId(),
                            "email", user.getEmail(),
                            "fullName", user.getFullName(),
                            "role", user.getRole().name(),
                            "token", token
                    ));
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid email or password")));
    }

    
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
            .map(user -> {
                UserDto dto = new UserDto();
                dto.setId(user.getId());
                dto.setFullName(user.getFullName());
                dto.setEmail(user.getEmail());
                dto.setRole(user.getRole().name());
                return ResponseEntity.ok(dto);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> {
                    UserDto dto = new UserDto();
                    dto.setId(user.getId());
                    dto.setFullName(user.getFullName());
                    dto.setEmail(user.getEmail());
                    dto.setRole(user.getRole().name());
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    
    @GetMapping("/by-email")
    public ResponseEntity<User> getUserByEmailRole(@RequestParam String email) {
        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userOpt.get());
    }
    
    @PostMapping("/api/users/by-ids")
    public List<User> getUsersByIds(@RequestBody Map<String, List<Long>> body) {
        List<Long> ids = body.get("ids");
        return userRepository.findAllById(ids);
    }

    
    @PutMapping("/reset-password/{email}")
    public ResponseEntity<?> resetPassword(@PathVariable String email, @RequestBody Map<String, String> body) {
        String newPassword = body.get("password");
        if (newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("New password must not be empty");
        }
        // Add this line:
        boolean success = userService.resetPassword(email, newPassword);
        if (!success) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok("Password updated successfully");
    }

}

